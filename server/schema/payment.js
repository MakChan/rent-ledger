import { gql } from "apollo-server-lambda";

export default gql`
  input PaymentInput {
    reading: Int
    electricityCharges: Float
    paidElectricityCharges: Float
    totalPaid: Int
    balance: Float
    datePaid: Date
    remark: String
  }

  extend type Query {
    payment(_id: String!): Payment
    payments(_id: String!): [Payment!]
    allPayments: [AllPaymentPayload!]
  }

  extend type Mutation {
    createPayment(payment: PaymentInput, leaseId: String): Payment
  }

  type AllPaymentPayload {
    _id: MonthYear
    id: String
    totalElectricity: Float
    totalPaidElectricity: Float
    totalPaid: Float
    count: Int
  }

  type MonthYear {
    month: String
    year: String
  }

  type Payment {
    _id: String!
    reading: Int
    electricityCharges: Float
    paidElectricityCharges: Float
    totalPaid: Float
    balance: Float
    datePaid: Date
    remark: String
  }
`;
