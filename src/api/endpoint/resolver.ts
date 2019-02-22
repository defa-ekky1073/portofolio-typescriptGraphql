import { Endpoint } from '../models';
import { resolverLogger } from '../../lib/logger';
export const endpointResolver = {

    Query: {

        endpointAll(_: any, args: any) {
            resolverLogger.trace('===Attached Arguments===');
            resolverLogger.trace(args);

            return Endpoint.findAll({ where: args });
        },

        endpointById(_: any, args: any) {
            resolverLogger.trace('===Attached Arguments===');
            resolverLogger.trace(args);

            return Endpoint.findOne({ where: { id: args.id } });
        }
    },

    Mutation: {
        createEndpoint(_: any, args: any, context: any) {
            resolverLogger.trace('===Attached Arguments===');
            resolverLogger.trace(args);
            resolverLogger.trace('===Attached Context===');
            resolverLogger.trace(context);

            return Endpoint.create({
                role_id: args.role_id,
                path: args.path,
                method: args.method,
                can_access: args.can_access
            });
        },

        updateEndpoint(_: any, args: any, context: any) {
            resolverLogger.trace('===Attached Arguments===');
            resolverLogger.trace(args);
            resolverLogger.trace('===Attached Context===');
            resolverLogger.trace(context);

            return Endpoint.update({
                role_id: args.role_id,
                path: args.path,
                method: args.method,
                can_access: args.can_access
            }, { where: { id: args.id }, returning: true, plain: true });
        },

        async deleteEndpoint(_: any, args: any, context: any) {
            resolverLogger.trace('===Attached Arguments===');
            resolverLogger.trace(args);
            resolverLogger.trace('===Attached Context===');
            resolverLogger.trace(context);

            let data = await Endpoint.findOne({ where: { id: args.id } });

            if (!data) {
                return {
                    code: '400',
                    message: 'Record not found'
                };
            }

            return Endpoint.destroy({ where: { id: args.id } })
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