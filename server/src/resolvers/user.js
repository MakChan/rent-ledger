import jwt from "jsonwebtoken";
import { AuthenticationError, UserInputError } from "apollo-server";

const createToken = async (user, expiresIn) => {
  const { _id, username } = user;
  return await jwt.sign({ _id, username }, process.env.SECRET, {
    expiresIn
  });
};

export default {
  Query: {
    user: async (parent, { _id }, { models }) => {
      return await models.User.findOne({ _id: _id }).populate("landlord");
    },
    me: async (parent, args, { models, me }) => {
      console.log('me ==>', me); // TODO: remove this
      return await models.User.findOne({ _id: me._id }).populate("landlord");
    }
  },
  Mutation: {
    createUser: async (parent, { name, username, password }, { models }) => {
      // console.log("name, username, password ==>", name, username, password); // TODO: remove this
      const landlord = await models.Landlord.create({ name });
      const user = await models.User.create({
        username: username,
        password: password,
        landlord: landlord._id
      });

      user.landlord = landlord;
      console.log('user ==>', user); // TODO: remove this
      return { token: createToken(user, "30d"), user };
    },
    logIn: async (parent, { username, password }, { models }) => {
      const user = await models.User.findByLogin(username);

      if (!user) {
        throw new UserInputError("No user found with this login credentials.");
      }
      const isValid = await user.validatePassword(password);

      if (!isValid) {
        throw new AuthenticationError("Invalid password.");
      }
      console.log('user ==>', user); // TODO: remove this
      return { token: createToken(user, "30d"), user };
    }
  }

  // User: {
  //   landlord: async (user, args, { models }) => {
  //     return await models.Landlord.findOne({
  //       userId: user._id
  //     });
  //   }
  // }
};
