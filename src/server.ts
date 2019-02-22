import * as express from 'express';
import * as bodyParser from 'body-parser';
import { createServer } from 'http';
import { graphql, execute, subscribe } from 'graphql';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { PubSub } from 'graphql-subscriptions';
import { makeExecutableSchema } from 'graphql-tools';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import * as cors from 'cors';
import * as path from 'path';
import { typeDefs } from './api/typeMerger';
import { resolvers } from './api/resolverMerger';
import { verify, permitMiddleware } from './lib';
import config from './config';
const { APP_PORT, LOCALHOST } = config;
var router = express.Router();



// Creating Express and defining Public Subscription
const graphQLServer = express();
const pubSub = new PubSub();

// Create Schema from existing Types and Resolvers
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

/**
 * Define server to use cors
 * Set server endpoint "graphiql" that required proper token to be accessed
 */
graphQLServer.use(cors());
graphQLServer.use(express.static(path.join(__dirname, 'assets')));
graphQLServer.set('view engine', 'ejs');
graphQLServer.use(bodyParser.urlencoded({ extended: false }));
graphQLServer.use(bodyParser.json());
graphQLServer.use('/graphql', bodyParser.json(), verify, permitMiddleware, graphqlExpress((req, res) => ({
    schema,
    context: {
        req: req,
        res: res
    }
})));
graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql', subscriptionsEndpoint: `ws://${LOCALHOST}:${APP_PORT}/subscriptions`}));

// Define the routing for various endpoint
graphQLServer.use('/status', function (req: any, res: any) {
    res.render(__dirname + `\\views\\landing.ejs`);
});
// Use external routing module
require('./routes/auth')(graphQLServer, router);

// Creating Server
const APIServer = createServer(graphQLServer);

// Creating server listener
APIServer.listen(APP_PORT, () => {
    console.log(`App is running on http://${LOCALHOST}:${APP_PORT}`);

    // Creating GraphQL Subscription Server using WebSocket
    const subscriptionServer = SubscriptionServer.create(
        {
            schema,
            execute,
            subscribe,
        },
        {
            server: APIServer,
            path: '/subscriptions',
        },
    );
});