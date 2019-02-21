import { Users, Role } from '../api/models';
import * as crypto from 'crypto-js';
import * as moment from 'moment';
import { getToken } from '../lib/token';

module.exports = function (app: any, router: any) {
    router.post('/login', async function (req: any, res: any) {
        var user = await Users.findOne({
            where: {
                username: req.body.username,
            }
        });

        if ( !user  ) {
            res.json({
              status: 'Failed',
              message: 'User Not Found',
              token: null
            });
        }

        var password = await crypto.SHA256(req.body.password).toString();

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

        if ( !payload  ) {
            res.json({
              status: 'Failed',
              message: 'Wrong Password',
              token: null
            });
        }

        var token = await getToken(payload);

        var time = moment().format();

        Users.update({
            last_login: time
        }, { where: {username: req.body.username} });

        res.json({
            status: 'Success',
            message: 'Enjoy your token',
            token: token
        });
    });

    router.post('/forgetPassword', async function (req: any, res: any) {
        var user = await Users.findOne({
            where: {
                username: req.body.username,
            }
        });

        if ( !user  ) {
            res.json({
              status: 'Failed',
              message: 'User Not Found'
            });
        }

        var password = await crypto.SHA256(req.body.password).toString();

        return Users.update({
            password: password
        }, { where: { username: req.body.username } })
        .then((response) => {
            if (response[0] === 1) {
                return res.status(200).json({
                    code: '200',
                    message: 'OK'
                });
            } else {
                return res.status(400).json({
                    code: '400',
                    message: 'Password Failed to Update'
                });
            }
        });
    });

    app.use('/authentication', router);
};