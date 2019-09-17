import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    room(_id: String!): Room
    rooms(_id: String!): [RoomPayload!]
  }

  extend type Mutation {
    createRoom(roomNo: String!): Room!
  }

  type RoomPayload {
    _id: String!
    roomNo: String!
    landlordId: String!
    lease: Lease
  }

  type Room {
    _id: String!
    roomNo: String!
    landlordId: String!
  }
`;
