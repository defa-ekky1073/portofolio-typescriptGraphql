// Define graphql schema type for User Operations
export const companyType = `
type Company {
    id: Int
    name: String
    address: String
    phone_number: String
    fax_number: String
    note: String
    is_deleted: Boolean
}

type Query {
    companyAll: [Company]
    companyById(
        id: Int
    ): Company
}

type Mutation {
    createCompany(
        name: String
        address: String
        phone_number: String
        fax_number: String
        note: String
    ): Company
    updateCompany(
        id: Int
        name: String
        address: String
        phone_number: String
        fax_number: String
        note: String
    ): Company
    deleteCompany(
        id: Int
    ): MetaData
}

schema{
    query: Query
    mutation: Mutation
}
`;
