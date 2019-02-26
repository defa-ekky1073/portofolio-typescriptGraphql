import { Users } from '../models';
import * as crypto from 'crypto-js';
import { resolverLogger } from '../../lib/logger';
export const usersResolver = {

    Query: {

        usersAll(_: any, args: any) {
            resolverLogger.trace('===Attached Arguments===');
            resolverLogger.trace(args);

            return Users.findAll({ where: { is_deleted: false } });
        },

        usersById(_: any, args: any) {
            resolverLogger.trace('===Attached Arguments===');
            resolverLogger.trace(args);

            return Users.findOne({ where: { id: args.id, is_deleted: false } });
        },

        viewLoggedUsers(_: any, args: any) {
            resolverLogger.trace('===Attached Arguments===');
            resolverLogger.trace(args);

            return Users.findAll({ where: { company_id: args.company_id, is_deleted: false, is_logged: true } });
        },
    },

    Mutation: {
        async createUsers(_: any, args: any, context: any) {
            resolverLogger.trace('===Attached Arguments===');
            resolverLogger.trace(args);
            resolverLogger.trace('===Attached Context===');
            resolverLogger.trace(context);

            var password = await crypto.SHA256(args.password).toString();
            resolverLogger.trace('Encrypted Password: ' + password);

            return Users.create({
                role_id: args.role_id,
                employee_id: args.employee_id,
                username: args.username,
                password: password,
                is_logged: false,
                is_active: true,
                is_deleted: false,
                created_by: context.res.locals.id,
                updated_by: context.res.locals.id
            });
        },

        async updateUsers(_: any, args: any, context: any) {
            resolverLogger.trace('===Attached Arguments===');
            resolverLogger.trace(args);
            resolverLogger.trace('===Attached Context===');
            resolverLogger.trace(context);

            var password = await crypto.SHA256(args.password).toString();
            resolverLogger.trace('Encrypted Password: ' + password);

            return Users.update({
                role_id: args.role_id,
                employee_id: args.employee_id,
                username: args.username,
                password: password,
                is_active: args.is_active,
                updated_by: context.res.locals.id
            }, { where: { id: args.id }, returning: true, plain: true });
        },

        async deleteUsers(_: any, args: any, context: any) {
            resolverLogger.trace('===Attached Arguments===');
            resolverLogger.trace(args);
            resolverLogger.trace('===Attached Context===');
            resolverLogger.trace(context);

            let data = await Users.findOne({ where: { id: args.id, is_deleted: false } });

            if (!data) {
                return {
                    code: '400',
                    message: 'Record not found'
                };
            }

            return Users.update({
                is_deleted: true,
                updated_by: context.res.locals.id
            }, { where: { id: args.id } })
            .then((response) => {
                if (response[0] === 1) {
                    return {
                        code: '200',
                        message: 'OK'
                    };
                } else {
                    return {
                        code: '400',
                        message: 'Record not deleted'
                    };
                }
            });
        },

        async updatePassword(_: any, args: any, context: any) {
            resolverLogger.trace('===Attached Arguments===');
            resolverLogger.trace(args);
            resolverLogger.trace('===Attached Context===');
            resolverLogger.trace(context);

            var password = await crypto.SHA256(args.password).toString();
            resolverLogger.trace('Encrypted Password: ' + password);

            return Users.update({
                password: password,
                updated_by: context.res.locals.id
            }, { where: { username: args.username }, returning: true, plain: true });
        },
    },
};