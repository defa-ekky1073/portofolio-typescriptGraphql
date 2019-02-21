import { mergeTypes } from 'merge-graphql-schemas';

// import all required types
import { masterType } from './master_schema';
import { companyType } from './company/schema';
import { employeeType } from './employee/schema';
import { endpointType } from './endpoint/schema';
import { usersType } from './users/schema';
import { roleType } from './role/schema';

// Merge all types into 1 variables
const typeDefs = mergeTypes([
    masterType,
    companyType,
    employeeType,
    endpointType,
    usersType,
    roleType
]);

export { typeDefs };