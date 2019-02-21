// Define graphql schema type for User Operations
export const employeeType = `
type Employee {
    id: Int
    id_number: String
    name: String
    birth_place: String
    birth_date: String
    gender: String
    address: String
    phone_number: String
    email: String
    note: String
    is_active: Boolean
    is_deleted: Boolean
    created_by: Int
    updated_by: Int
}

type Query {
    employeeAll: [Employee]
    employeeById(
        id: Int
    ): Employee
}

type Mutation {
    createEmployee(
        id_number: String
        name: String
        birth_place: String
        birth_date: String
        gender: String
        address: String
        phone_number: String
        email: String
        note: String
    ): Employee
    updateEmployee(
        id: Int
        id_number: String
        name: String
        birth_place: String
        birth_date: String
        gender: String
        address: String
        phone_number: String
        email: String
        note: String
        is_active: Boolean
    ): Employee
    deleteEmployee(
        id: Int
    ): MetaData
}

schema{
    query: Query
    mutation: Mutation
}
`;
