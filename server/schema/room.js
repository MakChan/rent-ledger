import { gql } from "apollo-server-lambda";

export default gql`
  input CreateRoomInput {
    roomNo: String!
  }

  extend type Query {
    room(_id: String!): Room
    rooms: [RoomPayload!]
  }

  extend type Mutation {
    createRoom(roomNo: String!): Room!
    createMultipleRooms(rooms: [CreateRoomInput]): [Room]
  }

  type RoomPayload {
    _id: String!
    roomNo: String!
    landlordId: String!
    currentLease: Lease
  }

  type Room {
    _id: String!
    roomNo: String!
    landlordId: String!
  }
`;
