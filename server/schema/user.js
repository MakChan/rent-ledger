import { gql } from "apollo-server-lambda";

export default gql`
  extend type Query {
    user(_id: String!): User
    me: User
  }

  extend type Mutation {
    createUser(name: String!, username: String!, password: String!): UserPayload!
    logIn(username: String!, password: String!): UserPayload!
  }

  type UserPayload {
    token: String!
    user: User!
  }

  type User {
    _id: String!
    username: String!
    landlord: Landlord!
  }
`;
