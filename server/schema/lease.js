import { gql } from "apollo-server-lambda";

export default gql`
  input LeaseInput {
    rent: Int
    extraCharges: Int
    initialReading: Int
    current: Boolean
    room: String
    date: Date
    remark: String
  }

  input TenantInput {
    name: String!
    phoneNumber: String
    aadharNumber: String
  }

  extend type Query {
    lease(_id: String!): Lease
    leases(_id: String!): [Lease!]
    currentLeases: [LeasePayload!]
  }

  extend type Mutation {
    createTenantWithLease(lease: LeaseInput!, tenant: TenantInput!): Lease
    updateLease(_id: String!, lease: LeaseInput): Lease
  }

  type LeasePayload {
    _id: String!
    rent: Int
    extraCharges: Int
    initialReading: Int
    current: Boolean!
    date: Date!
    remark: String
    room: Room!
    landlord: Landlord
    tenant: Tenant!
    lastPayment: Payment
  }

  type Lease {
    _id: String!
    rent: Int
    extraCharges: Int
    initialReading: Int
    current: Boolean!
    date: Date!
    remark: String
    room: String!
    landlord: Landlord
    tenant: Tenant!
    payments: [Payment!]
  }
`;
