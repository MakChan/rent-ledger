import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    landlord(_id: String!): Landlord
    rooms(_id: String!): [Room!]
  }

  type Landlord {
    _id: String!
    name: String!
    rooms: [Room!]
  }
`;
