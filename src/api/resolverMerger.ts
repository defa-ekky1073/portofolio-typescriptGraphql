import { mergeResolvers } from 'merge-graphql-schemas';

// import all required resolver
import { companyResolver } from './company/resolver';
import { employeeResolver } from './employee/resolver';
import { endpointResolver } from './endpoint/resolver';
import { usersResolver } from './users/resolver';
import { roleResolver } from './role/resolver';

// Merge all resolver into 1 variable
const resolvers = mergeResolvers([
    companyResolver,
    employeeResolver,
    endpointResolver,
    usersResolver,
    roleResolver
]);

export { resolvers };