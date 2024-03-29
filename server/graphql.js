import models, { connectDb } from "./models";
import { ApolloServer, AuthenticationError } from "apollo-server-lambda";
import jwt from "jsonwebtoken";
import "dotenv/config";

import schema from "./schema";
import resolvers from "./resolvers";

const getMe = async headers => {
  const token = headers["x-token"];
  if (token && token != "null") {
    try {
      const me = await jwt.verify(token, process.env.SECRET);
      return await models.User.findOne({ _id: me._id });
    } catch (e) {
      throw new AuthenticationError("Your session expired. Sign in again.");
    }
  }
};

const server = new ApolloServer({
  introspection: true,
  playground: true,
  typeDefs: schema,
  resolvers,
  context: async ({ event, context }) => {
    const me = await getMe(event.headers);

    return {
      event,
      headers: event.headers,
      models,
      me,
      context
    };
  }
});

let conn = null;

export async function handler(event, context) {
  context.callbackWaitsForEmptyEventLoop = false;

  conn = await connectDb(conn);

  return new Promise((yay, nay) => {
    const cb = (err, args) => (err ? nay(err) : yay(args));
    server.createHandler({
      cors: {
        origin: true,
        credentials: true
      }
    })(event, context, cb);
  });
}