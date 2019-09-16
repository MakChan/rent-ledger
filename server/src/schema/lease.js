import { gql } from "apollo-server-express";

export default gql`
  input LeaseInput {
    rent: Int
    extraCharges: Int
    initialReading: Int
    current: Boolean
    room: String
    date: Date
  }

  input TenantInput {
    name: String!
    phoneNumber: String
    aadharNumber: String
  }

  extend type Query {
    lease(_id: String!): Lease
    leases(_id: String!): [Lease!]
  }

  extend type Mutation {
    createTenantWithLease(lease: LeaseInput!, tenant: TenantInput!): Lease
    updateLease(_id: String!, lease: LeaseInput): Lease
  }

  type Lease {
    _id: String!
    rent: Int!
    extraCharges: Int
    initialReading: Int
    current: Boolean!
    date: Date!
    room: Room!
    tenant: Tenant!
    payments: [Payment!]
  }
`;
