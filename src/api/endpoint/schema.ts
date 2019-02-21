// Define graphql schema type for User Operations
export const endpointType = `
type Endpoint {
    id: Int
    role_id: Int
    path: String
    method: String
    can_access: Boolean
}

type Query {
    endpointAll: [Endpoint]
    endpointById(
        id: Int
    ): Endpoint
}

type Mutation {
    createEndpoint(
        role_id: Int
        path: String
        method: String
        can_access: Boolean
    ): Endpoint
    updateEndpoint(
        id: Int
        role_id: Int
        path: String
        method: String
        can_access: Boolean
    ): Endpoint
    deleteEndpoint(
        id: Int
    ): MetaData
}

schema{
    query: Query
    mutation: Mutation
}
`;
