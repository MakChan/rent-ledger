import { gql } from "apollo-server-express";

export default gql`
  input PaymentInput {
    reading: Int
    electricityCharges: Int
    paidElectricityCharges: Int
    totalPaid: Int
    balance: Int
    datePaid: Date
    remark: String
  }

  extend type Query {
    payment(_id: String!): Payment
    payments(_id: String!): [Payment!]
  }

  extend type Mutation {
    createPayment(payment: PaymentInput, leaseId: String): Payment
  }

  type Payment {
    _id: String!
    reading: Int
    electricityCharges: Int
    paidElectricityCharges: Int
    totalPaid: Int
    balance: Int
    datePaid: Date
    remark: String
  }
`;
