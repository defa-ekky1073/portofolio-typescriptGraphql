import { Employee } from '../models';
import { resolverLogger } from '../../lib/logger';
export const employeeResolver = {

    Query: {

        employeeAll(_: any, args: any) {
            resolverLogger.trace('===Attached Arguments===');
            resolverLogger.trace(args);
            return Employee.findAll({ where: { is_deleted: false } });
        },

        employeeById(_: any, args: any) {
            resolverLogger.trace('===Attached Arguments===');
            resolverLogger.trace(args);
            return Employee.findOne({ where: { id: args.id, is_deleted: false } });
        }
    },

    Mutation: {
        createEmployee(_: any, args: any, context: any) {
            resolverLogger.trace('===Attached Arguments===');
            resolverLogger.trace(args);
            resolverLogger.trace('===Attached Context===');
            resolverLogger.trace(context);

            return Employee.create({
                id_number: args.id_number,
                name: args.name,
                birth_place: args.birth_place,
                birth_date: args.birth_place,
                gender: args.gender,
                address: args.address,
                phone_number: args.phone_number,
                email: args.email,
                note: args.note,
                is_active: true,
                is_deleted: false,
                created_by: context.res.locals.id,
                updated_by: context.res.locals.id
            });
        },

        updateEmployee(_: any, args: any, context: any) {
            resolverLogger.trace('===Attached Arguments===');
            resolverLogger.trace(args);
            resolverLogger.trace('===Attached Context===');
            resolverLogger.trace(context);

            return Employee.update({
                id_number: args.id_number,
                name: args.name,
                birth_place: args.birth_place,
                birth_date: args.birth_place,
                gender: args.gender,
                address: args.address,
                phone_number: args.phone_number,
                email: args.email,
                note: args.note,
                is_active: args.is_active,
                updated_by: context.res.locals.id
            }, { where: { id: args.id }, returning: true, plain: true });
        },

        async deleteEmployee(_: any, args: any, context: any) {
            resolverLogger.trace('===Attached Arguments===');
            resolverLogger.trace(args);
            resolverLogger.trace('===Attached Context===');
            resolverLogger.trace(context);

            let data = await Employee.findOne({ where: { id: args.id, is_deleted: false } });

            if (!data) {
                return {
                    code: '400',
                    message: 'Record not found'
                };
            }

            return Employee.update({
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