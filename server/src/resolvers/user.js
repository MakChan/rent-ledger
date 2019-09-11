export default {
  Query: {
    users: async (parent, args, { models }) => {
      return await models.User.find();
    },
    user: async (parent, { id }, { models }) => {
      return await models.User.find({ _id: id });
    },
    me: async (parent, args, { models, me }) => {
      return await models.User.find({ _id: me.id });
    }
  },

  User: {
    messages: async (user, args, { models }) => {
      return await models.Message.find({
        userId: user.id
      });
    }
  }
};
