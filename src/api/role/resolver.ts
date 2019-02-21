import { Role } from '../models';
export const roleResolver = {

    Query: {

        roleAll(_: any, args: any) {
            return Role.findAll({ where: { is_deleted: false } });
        },

        roleById(_: any, args: any) {
            return Role.findOne({ where: { id: args.id, is_deleted: false } });
        }
    },

    Mutation: {
        createRole(_: any, args: any, context: any) {
            return Role.create({
                nama: args.name,
                is_active: true,
                is_deleted: false,
                created_by: context.res.locals.id,
                updated_by: context.res.locals.id
            });
        },

        updateRole(_: any, args: any, context: any) {
            return Role.update({
                nama: args.name,
                is_active: args.is_active,
                updated_by: context.res.locals.id
            }, { where: { id: args.id }, returning: true, plain: true });
        },

        async deleteRole(_: any, args: any, context: any) {
            let data = await Role.findOne({ where: { id: args.id, is_deleted: false } });

            if (!data) {
                return {
                    code: '400',
                    message: 'Record not found'
                };
            }

            return Role.update({
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
        }
    },
};