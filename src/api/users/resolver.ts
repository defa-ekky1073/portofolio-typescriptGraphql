import { Users } from '../models';
import * as crypto from 'crypto-js';
export const usersResolver = {

    Query: {

        usersAll(_: any, args: any) {
            return Users.findAll({ where: { is_deleted: false } });
        },

        usersById(_: any, args: any) {
            return Users.findOne({ where: { id: args.id, is_deleted: false } });
        }
    },

    Mutation: {
        async createUsers(_: any, args: any, context: any) {

            var password = await crypto.SHA256(args.password).toString();

            return Users.create({
                role_id: args.role_id,
                employee_id: args.employee_id,
                username: args.username,
                password: password,
                is_active: true,
                is_deleted: false,
                created_by: context.res.locals.id,
                updated_by: context.res.locals.id
            });
        },

        async updateUsers(_: any, args: any, context: any) {

            var password = await crypto.SHA256(args.password).toString();

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

            var password = await crypto.SHA256(args.password).toString();

            return Users.update({
                password: password,
                updated_by: context.res.locals.id
            }, { where: { username: args.username }, returning: true, plain: true });
        },
    },
};