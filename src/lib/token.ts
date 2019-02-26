import * as jwt from 'jsonwebtoken';
import config from '../config';
import { functionLogger } from './index';
import { db } from './db';
const { SECRET } = config;

/**
 * function to create JWT Token
 * @param payload Payload for JWT
 */
function getToken(payload: any) {
    functionLogger.trace('===Token Payload===');
    functionLogger.trace(payload);
    var token = jwt.sign(payload, SECRET, {
        expiresIn: 60 * 60 * 24 // expires in 24 hours
    });
    functionLogger.debug('===Login Token===');
    functionLogger.debug(token);
    return token;
}

/**
 * Middleware function to verify provided token on request header
 * Used on GraphQL endpoint
 * @param req for any request on routing
 * @param res form any response on routing
 * @param next to proceed to next middleware on routing
 */
function verify(req: any, res: any, next: any) {

    return Promise.resolve()
    // Get authorization token from header
    .then(() => req.get('Authorization'))
    .then((token) => {

        // function return no access message if no token is provided
        if (!token) {
            functionLogger.warn('No Token');
            throw 'Unauthorized Access';
        }

        return token.split(' ');
    })
    .then(([bearer, token]) => {

        // verify the provided token
        return jwt.verify(token, SECRET);
    })
    .then((decoded) => {
        functionLogger.trace('===Decoded Token===');
        functionLogger.trace(decoded);

        // Verify if the users is exist within the database
        return db.query(`SELECT * FROM users WHERE username = '${decoded.username}'`)
        .spread((result, metadata) => {
            functionLogger.debug('===Found User===');
            functionLogger.debug(result);
            return result;
        });
    })
    .then((user) => {

        // Function throw "Invalid Auth Token" if email from provided token doesn't match any user email
        if (!user) {
            functionLogger.warn('No User Found');
            throw 'Invalid authorization token provided.';
        }

        // Set current user id in local session
        res.locals.id = user[0].id;

        // Get the authorized endpoint access for current user
        return db.query(`
            SELECT path, can_access
            FROM endpoint
            WHERE role_id = ${user[0].role_id}
        `)
        .spread((result, metadata) => {
            functionLogger.debug('===Allowed Endpoint===');
            functionLogger.debug(result);
            return result;
        });
    })
    .then((endpoint) => {

        // Set permitted endpoint list in local session
        res.locals.permission = JSON.stringify(endpoint);

        functionLogger.trace('===RES LOCALS Variable===');
        functionLogger.trace(res.locals);

        return next();
    })

    // throw "No Access" message if function catching an error
    .catch((err) => {
        functionLogger.error(err);
        return res.status(400)
        .json({message: err || 'You have no access.'});
    });
}

/**
 * Middleware function to authenticate token on request header for endpoint entry
 * Used on RESTful endpoints
 * @param req for any request on routing
 * @param res form any response on routing
 * @param next to proceed to next middleware on routing
 */
function authenticate(req: any, res: any, next: any) {

    return Promise.resolve()
    // Get authorization token from header
    .then(() => req.get('Authorization'))
    .then((token) => {

        // function return no access message if no token is provided
        if (!token) {
            functionLogger.warn('No Token');
            throw 'Unauthorized Access';
        }

        return token.split(' ');
    })
    .then(([bearer, token]) => {

        // verify the provided token
        return jwt.verify(token, SECRET);
    })
    .then((decoded) => {
        functionLogger.trace('===Decoded Token===');
        functionLogger.trace(decoded);

        // Verify if the users is exist within the database
        return db.query(`SELECT * FROM users WHERE username = '${decoded.username}'`)
        .spread((result, metadata) => {
            functionLogger.debug('===Found User===');
            functionLogger.debug(result);
            return result;
        });
    })
    .then((user) => {

        // Function throw "Invalid Auth Token" if email from provided token doesn't match any user email
        if (!user) {
            functionLogger.warn('No User Found');
            throw 'Invalid authorization token provided.';
        }

        // Get the authorized endpoint access for current user
        return db.query(`
            SELECT path, method
            FROM endpoint
            WHERE role_id = ${user[0].role_id}
        `)
        .spread((result, metadata) => {
            return result;
        });
    })
    .then((endpoint) => {

        // Combine path and method to create comparison variable
        var access = {
            path: req.baseUrl,
            method: req.method
        };
        functionLogger.debug('===Allowed Endpoint===');
        functionLogger.debug(endpoint);
        functionLogger.debug('===Current Endpoint===');
        functionLogger.debug(access);

        // Find inside endpoint list wether current path and method is exist
        if (JSON.stringify(endpoint).includes(JSON.stringify(access))) {
            functionLogger.warn('Access Granted');
            return next();
        }

        // Throw no access error if path and method is not found
        functionLogger.warn('Endpoint access not allowed');
        throw 'You have no access to this endpoint';
    })

    // throw "No Access" message if function catching an error
    .catch((err) => {
        functionLogger.error(err);
        return res.status(400)
        .json({message: err || 'You have no access.'});
    });
}

/**
 * Function to access permission of current queries to be executed
 * Used exclusively on GraphQL endpoint
 * @param req Request paramater from express routing
 * @param res Response parameter from express routing
 * @param next Next parameter for next middleware
 */
function permitMiddleware(req: any, res: any, next: any) {

    return Promise.resolve()
    .then(() => {
        functionLogger.trace('===Sent Query===');
        functionLogger.trace(req.body.query);
    })
    .then(() => req.body.query.trim().split(/[\W](\W*)/g, 10))
    .then((query) => {
        functionLogger.trace('===Splitted Query===');
        functionLogger.trace(query);

        // Combine path and can access value for comparison variable
        let access = {
            path: query[2].trim(),
            can_access: 1
        };

        functionLogger.debug('===Current Access===');
        functionLogger.debug(access);

        if (res.locals.permission.includes(JSON.stringify(access))) {
            functionLogger.warn('Query Access Granted');
            return next();
        } else {
            functionLogger.warn('Query Access Denied');
            throw `You have no access to this ${query[0].trim()}`;
        }
    }).catch((err) => {
        functionLogger.error(err);
        return res.status(400)
        .json({message: err || 'You have no access.'});
    });

}

export { getToken, verify, authenticate, permitMiddleware };
