export default {
  Query: {
    lease: async (parent, { _id }, { models }) => {
      return await models.Lease.findOne({ _id: _id });
    },
    payments: async (parent, { _id }, { models }) => {
      const room = await models.Lease.findOne({ _id: _id }).populate(
        "payments"
      );
      return room.payments;
    }
  }
};
