// Define graphql schema type for User Operations
export const roleType = `
type Role {
    id: Int
    name: String
    is_active: Boolean
    is_deleted: Boolean
    created_by: Int
    updated_by: Int
}

type Query {
    roleAll: [Role]
    roleById(
        id: Int
    ): Role
}

type Mutation {
    createRole(
        name: String
    ): Role
    updateRole(
        id: Int
        name: String
        is_active: Boolean
    ): Role
    deleteRole(
        id: Int
    ): MetaData
}

schema{
    query: Query
    mutation: Mutation
}
`;
