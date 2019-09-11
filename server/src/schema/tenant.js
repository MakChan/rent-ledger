import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    tenant(_id: String!): Tenant
  }

  type Tenant {
    _id: String!
    name: String!
    phoneNumber: String
    aadharNumber: String
  }
`;
