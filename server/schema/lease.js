import { gql } from "apollo-server-lambda";

export default gql`
  input LeaseInput {
    _id: String
    rent: Int
    extraCharges: Int
    initialReading: Int
    current: Boolean
    room: String
    date: Date
    remark: String
  }

  input TenantInput {
    _id: String
    name: String
    phoneNumber: String
    aadharNumber: String
  }

  extend type Query {
    lease(_id: String!): Lease
    leaseWithPayments(_id: String!): LeaseWithPaymentsPayload
    leases(_id: String!): [Lease!]
    currentLeases: [LeasePayload!]
  }

  extend type Mutation {
    createTenantWithLease(lease: LeaseInput!, tenant: TenantInput!): Lease
    editTenantWithLease(lease: LeaseInput!, tenant: TenantInput!): EditLeasePayload
    updateLease(_id: String!, lease: LeaseInput): Lease
    endLease(_id: String!): Lease
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

  type EditLeasePayload {
    result : String
  }  

  type LeaseWithPaymentsPayload {
    _id: String!
    rent: Int
    extraCharges: Int
    initialReading: Int
    current: Boolean!
    date: Date!
    remark: String
    room: Room!
    tenant: Tenant!
    payments: [Payment]
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
