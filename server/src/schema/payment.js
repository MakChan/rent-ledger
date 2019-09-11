import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    payment(_id: String!): Payment
  }

  type Payment {
    _id: String!
    reading: Int!
    electricityCharges: Int!
    totalPaid: Int
    balance: Int
  }
`;
