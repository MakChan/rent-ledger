export default {
  Query: {
    user: async (parent, { _id }, { models }) => {
      return await models.User.findOne({ _id: _id });
    },
    me: async (parent, args, { models, me }) => {
      return await models.User.findOne({ _id: me._id });
    }
  },
  Mutation: {
    createUser: async (parent, { name, username, password }, { models }) => {
      const landlord = await models.Landlord.create({ name });
      return await models.User.create({
        username: username,
        password: password,
        landlord: landlord._id
      });
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
