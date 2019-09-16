import express from "express";
import cors from "cors";
import models, { connectDb } from "./models";
import { ApolloServer, AuthenticationError } from "apollo-server-express";
import jwt from "jsonwebtoken";
import "dotenv/config";

import schema from "./schema";
import resolvers from "./resolvers";

const app = express();
app.use(cors());

const getMe = async req => {
  const token = req.headers["x-token"];
  console.log('token ==>', token); // TODO: remove this
  if (token && token != "null") {
    console.log("if")
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (e) {
      throw new AuthenticationError("Your session expired. Sign in again.");
    }
  }
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async ({ req }) => {
    const me = await getMe(req);

    return {
      models,
      me
    };
  }
});

server.applyMiddleware({ app, path: "/graphql" });

connectDb().then(async () => {
  app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`)
  );
});
