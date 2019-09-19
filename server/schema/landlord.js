import { gql } from "apollo-server-lambda";

export default gql`
  extend type Query {
    landlord(_id: String!): Landlord
  }

  type Landlord {
    _id: String!
    name: String!
    rooms: [Room!]
  }
`;
