import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    room(_id: String!): Room
    leases(_id: String!): [Lease!]
  }

  type Room {
    _id: String!
    roomNo: String!
    leases: [Lease!]
  }
`;
