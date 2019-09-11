import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    lease(_id: String!): Lease
    payments(_id: String!): [Payment!]
  }

  type Lease {
    _id: String!
    rent: Int!
    extraCharges: Int
    initialReading: Int
    current: Boolean!
    date: Date!
    tenant: Tenant!
    payments: [Payment!]
  }
`;
