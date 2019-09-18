export default {
  Query: {
    payment: async (parent, { _id }, { models }) => {
      return await models.Payment.findOne({ _id: _id });
    },
    payments: async (parent, { _id }, { models }) => {
      const room = await models.Lease.findOne({ _id: _id }).populate(
        "payments"
      );
      return room.payments;
    }
  },
  Mutation: {
    createPayment: async (parent, { payment, leaseId }, { models, me }) => {
      const newPayment = await models.Payment.create(payment);
      const lease = await models.Lease.update(
        { _id: leaseId },
        {
          $push: { payments: newPayment._id }
        }
      );

      return newPayment;
    }
  }
};
