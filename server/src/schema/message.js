import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    messages: [Message!]!
    message(_id: String!): Message!
  }

  extend type Mutation {
    createMessage(text: String!): Message!
    deleteMessage(_id: String!): Boolean!
  }

  type Message {
    _id: String!
    text: String!
    user: User!
  }
`;