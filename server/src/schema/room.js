import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    room(_id: String!): Room
    rooms(_id: String!): [Room!]
  }

  extend type Mutation {
    createRoom(roomNo: String!): Room!
  }

  type Room {
    _id: String!
    roomNo: String!
    landlordId: String!
  }
`;
