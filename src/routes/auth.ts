import { Users, Role } from '../api/models';
import * as crypto from 'crypto-js';
import * as moment from 'moment';
import { getToken } from '../lib/token';
import { endpointLogger } from '../lib/logger';


module.exports = function (app: any, router: any) {
    router.post('/login', async function (req: any, res: any) {
        endpointLogger.debug('===Received Request===');
        endpointLogger.debug(req.body);

        // Find user with matching username
        var user = await Users.findOne({
            where: {
                username: req.body.username,
            }
        });

        // Return failed status when user not found
        if ( !user  ) {
            endpointLogger.warn('User Not Found');
            res.json({
              status: 'Failed',
              message: 'User Not Found',
              token: null
            });
        }

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
            include: {
                model: Role,
                attributes: ['id', 'nama']
            },
            raw: true
        });
        endpointLogger.trace('===Token Payload===');
        endpointLogger.trace(payload);

        if ( !payload  ) {
            endpointLogger.warn('Mismatch Password, Payload not Generated');
            res.json({
              status: 'Failed',
              message: 'Wrong Password',
              token: null
            });
        }

        // Create token with defined payload
        var token = await getToken(payload);

        // Set time for last_login logging
        var time = moment().format();

        // Update last_login on user table
        Users.update({
            last_login: time
        }, { where: {username: req.body.username} });

        // Respond to the front end with token attached
        endpointLogger.warn('Token Sent!');
        res.json({
            status: 'Success',
            message: 'Enjoy your token',
            token: token
        });
    });

    app.use('/authentication', router);
};