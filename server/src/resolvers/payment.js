export default {
  Query: {
    payment: async (parent, { _id }, { models }) => {
      return await models.Payment.findOne({ _id: _id });
    }
  }
};
