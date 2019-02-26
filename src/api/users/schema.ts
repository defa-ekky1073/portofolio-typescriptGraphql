// Define graphql schema type for User Operations
export const usersType = `
type Users {
    id: Int
    role_id: Int
    employee_id: Int
    company_id: Int
    username: String
    password: String
    last_login: String
    is_logged: String
    is_active: Boolean
    is_deleted: Boolean
    created_by: Int
    updated_by: Int
}

type Query {
    usersAll: [Users]
    usersById(
        id: Int
    ): Users
    viewLoggedUsers(
        company_id: Int
    ): [Users]
}

type Mutation {
    createUsers(
        role_id: Int
        employee_id: Int
        company_id: Int
        username: String
        password: String
    ): Users
    updateUsers(
        id: Int
        role_id: Int
        employee_id: Int
        company_id: Int
        username: String
        password: String
        is_active: Boolean
    ): Users
    deleteUsers(
        id: Int
    ): MetaData
    updatePassword(
        username: String
        password: String
    ): Users
}

schema{
    query: Query
    mutation: Mutation
}
`;
