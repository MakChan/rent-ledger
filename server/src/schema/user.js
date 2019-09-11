import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    user(_id: String!): User
    me: User
  }

  extend type Mutation {
    createUser(name: String!, username: String!, password: String!): User!
  }

  type User {
    _id: String!
    username: String!
    landlord: Landlord!
  }
`;
