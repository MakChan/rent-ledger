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
      const mess = await models.User.findOne({ _id: me._id }).populate("landlord");
      console.log('mess ==>', mess); // TODO: remove this
      return mess;
    }
  },
  Mutation: {
    createUser: async (parent, { name, username, password }, { models }) => {
      const landlord = await models.Landlord.create({ name });
      const user = models.User.create({
        username: username,
        password: password,
        landlord: landlord._id
      });

      return { token: createToken(user, "30d") };
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
      return { token: createToken(user, "30d") };
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
