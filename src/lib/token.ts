import * as jwt from 'jsonwebtoken';
import config from '../config';
import { db } from './index';
const { SECRET } = config;

/**
 * function to create JWT Token
 * @param payload Payload for JWT
 */
function getToken(payload: any) {
    var token = jwt.sign(payload, SECRET, {
        expiresIn: 60 * 60 * 24 // expires in 24 hours
    });
    return token;
}

/**
 * Middleware function to verify provided token on request header
 * @param req for any request on routing
 * @param res form any response on routing
 * @param next to proceed to next middleware on routing
 */
function verify(req: any, res: any, next: any) {

    return Promise.resolve()
    // Get authorization token from header
    .then(() => req.get('Bearer'))
    .then((token) => {

        // function return no access message if no token is provided
        if (!token) {
            throw 'Unauthorized Access';
        }
        // verify the provided token
        return jwt.verify(token, SECRET);
    })
    .then((decoded) => {
        // Verify if the users is exist within the database
        return db.query(`SELECT * FROM users WHERE username = '${decoded.username}'`)
        .spread((result, metadata) => {
            return result;
        });
    })
    .then((user) => {

        // Function throw "Invalid Auth Token" if email from provided token doesn't match any user email
        if (!user) {
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
            return result;
        });
    })
    .then((endpoint) => {

        // Set permitted endpoint list in local session
        res.locals.permission = JSON.stringify(endpoint);

        return next();
    })

    // throw "No Access" message if function catching an error
    .catch((err) => {
        console.log(err);
        return res.status(400)
        .json({message: err || 'You have no access.'});
    });
}

/**
 * Middleware function to verify provided token on request header
 * @param req for any request on routing
 * @param res form any response on routing
 * @param next to proceed to next middleware on routing
 */
function authenticate(req: any, res: any, next: any) {

    return Promise.resolve()
    // Get authorization token from header
    .then(() => req.get('Bearer'))
    .then((token) => {

        // function return no access message if no token is provided
        if (!token) {
            throw 'Unauthorized Access';
        }
        // verify the provided token
        return jwt.verify(token, SECRET);
    })
    .then((decoded) => {
        // Verify if the users is exist within the database
        return db.query(`SELECT * FROM users WHERE username = '${decoded.username}'`)
        .spread((result, metadata) => {
            return result;
        });
    })
    .then((user) => {

        // Function throw "Invalid Auth Token" if email from provided token doesn't match any user email
        if (!user) {
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

        // Find inside endpoint list wether current path and method is exist
        if (JSON.stringify(endpoint).includes(JSON.stringify(access))) {
            return next();
        }

        // Throw no access error if path and method is not found
        throw 'You have no access to this endpoint';
    })

    // throw "No Access" message if function catching an error
    .catch((err) => {
        console.log(err);
        return res.status(400)
        .json({message: err || 'You have no access.'});
    });
}

// function permit(req: any, res: any) {

//     return Promise.resolve()
//     .then(() => req.body.query.split(/[{(]/))
//     .then((query) => {

//         let access = {
//             path: query[1].trim(),
//             can_access: true
//         };

//         if (res.locals.permission.includes(JSON.stringify(access))) {
//             return [ true, ''];
//         } else {
//             return [ false, `You have no access to this ${query[0].trim()}`];
//         }
//     }).catch((err) => {
//         console.log(err);
//         return { message: err };
//     });

// }

/**
 * Function to access permission of current action to be executed
 * @param req Request paramater from express routing
 * @param res Response parameter from express routing
 * @param next Next parameter for next middleware
 */
function permitMiddleware(req: any, res: any, next: any) {

    return Promise.resolve()
    // .then(() => console.log(req.body.query))
    .then(() => req.body.query.trim().split(/[\W](\W*)/g, 3))
    .then((query) => {

        let access = {
            path: query[2].trim(),
            can_access: true
        };

        if (res.locals.permission.includes(JSON.stringify(access))) {
            return next();
        } else {
            throw `You have no access to this ${query[0].trim()}`;
        }
    }).catch((err) => {
        console.log(err);
        return res.status(400)
        .json({message: err || 'You have no access.'});
    });

}

export { getToken, verify, authenticate, permitMiddleware };
