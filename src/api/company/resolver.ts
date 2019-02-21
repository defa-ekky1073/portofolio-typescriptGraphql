import { Company } from '../models';
export const companyResolver = {

    Query: {

        companyAll(_: any, args: any) {
            return Company.findAll({ where: { is_deleted: false } });
        },

        companyById(_: any, args: any) {
            return Company.findOne({ where: { id: args.id, is_deleted: false } });
        }
    },

    Mutation: {
        createCompany(_: any, args: any, context: any) {
            return Company.create({
                name: args.name,
                address: args.address,
                phone_number: args.phone_number,
                fax_numer: args.fax_number,
                not: args.note,
                is_deleted: false,
                created_by: context.res.locals.id,
                updated_by: context.res.locals.id
            });
        },

        updateCompany(_: any, args: any, context: any) {
            return Company.update({
                name: args.name,
                address: args.address,
                phone_number: args.phone_number,
                fax_numer: args.fax_number,
                not: args.note,
                updated_by: context.res.locals.id
            }, { where: { id: args.id }, returning: true, plain: true });
        },

        async deleteCompany(_: any, args: any, context: any) {
            let data = await Company.findOne({ where: { id: args.id, is_deleted: false } });

            if (!data) {
                return {
                    code: '400',
                    message: 'Record not found'
                };
            }

            return Company.update({
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