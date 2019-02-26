import { Users, Role } from '../api/models';
import * as crypto from 'crypto-js';
import * as moment from 'moment';
import { getToken, verify } from '../lib/token';
import { endpointLogger } from '../lib/logger';


module.exports = function (app: any, router: any) {
    router.post('/login', async function (req: any, res: any, next: any) {
        endpointLogger.debug('===Received Request===');
        endpointLogger.debug(req.body);

        try {
            // Find user with matching username
            await Users.findOne({
                where: {
                    username: req.body.username,
                }
            })
            .then((result) => {
                endpointLogger.trace('===Login Username Trace===');
                endpointLogger.trace(result);

                // Return failed status when user not found
                if ( !result ) {
                    endpointLogger.warn('User Not Found');
                    throw new Error('User not found');
                }
            });

            endpointLogger.warn('User Found');

            // Encrypt user password
            var password = await crypto.SHA256(req.body.password).toString();
            endpointLogger.trace('Encrypted Password: ' + password);

            // Create token payload
            var payload = await Users.findOne({
                attributes: ['id', 'username'],
                where: {
                    username: req.body.username,
                    password: password
                },
                raw: true
            })
            .then((result) => {
                endpointLogger.trace('===Login Password Trace===');
                endpointLogger.trace(result);

                // Return wrong password status if payload is not generated}
                if ( !result ) {
                    endpointLogger.warn('Mismatch Password, Payload not Generated');
                    throw new Error('Wrong Password');
                }

                return result;
            });

            endpointLogger.trace('===Token Payload===');
            endpointLogger.trace(payload);

            endpointLogger.warn('User Password is Correct');
            // Create token with defined payload
            var token = await getToken(payload);

            // Set time for last_login logging
            var time = moment().format();

            // Update last_login on user tablea
            Users.update({
                last_login: time,
                is_logged: true
            }, { where: {username: req.body.username} });

            // Respond to the front end with token attached
            endpointLogger.warn('Token Sent!');
            return res.json({
                status: 'Success',
                message: 'Enjoy your token',
                token: token
            });
        } catch (err) {
            return next(err);
        }
    });

    router.get('/logout', verify, async function(req: any, res: any, next: any) {

        endpointLogger.debug('===User Id===');
        endpointLogger.debug(res.locals.id);

        try {
            // Assuring if the user is exist
            await Users.findOne({
                where: {
                    id: res.locals.id,
                }
            })
            .then((result) => {
                endpointLogger.trace('===Logout User Trace===');
                endpointLogger.trace(result);

                if ( !result  ) {

                    // Return failed status when user not found
                    endpointLogger.warn('User Not Found');
                    throw new Error('User not found');
                }
            });

            endpointLogger.warn('User found');

            // Assuring if the user is logged in
            await Users.findOne({
                where: {
                    id: res.locals.id,
                    is_logged: true
                }
            })
            .then((result) => {
                endpointLogger.trace('===Logout Log Status Trace===');
                endpointLogger.trace(result);

                if ( !result  ) {

                    // Return failed status when user is not logged in
                    endpointLogger.warn('User has logged out');
                    throw new Error('User has logged out');
                }
            });

            endpointLogger.warn('User is logged on');

            // Update is_logged status on user table
            await Users.update({
                is_logged: false
            }, { where: {id: res.locals.id} })
            .then((result) => {
                endpointLogger.trace('===Logout Update Status Trace===');
                endpointLogger.trace(result);

                if (result[0] === 0) {

                // Send respont to client when failed to log out
                    endpointLogger.warn('User failed to log out');
                    throw new Error('Failed to log out');
                }
            });

            endpointLogger.warn('Log status update success');

            // Send respont to client when successfully logged
            endpointLogger.warn('User successfully logged out');
            return res.json({
                status: 'Success',
                message: 'You have logged out',
            });
        } catch (err) {
            return next(err);
        }
    });

    app.use('/authentication', router);
};