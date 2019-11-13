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
    },
    allPayments: async (parent, {}, { models, me }) => {
      const payments = await models.Lease.aggregate([
        { $match: { landlord: me.landlord } },
        {
          $lookup: {
            from: "payments",
            as: "payments",
            localField: "payments",
            foreignField: "_id"
          }
        },
        { $unwind: "$payments" },
        {
          $group: {
            _id: {
              month: { $month: "$payments.datePaid" },
              year: { $year: "$payments.datePaid" }
            },
            id: { $first: "$payments._id" }, // To avoid caching, refer https://github.com/apollographql/react-apollo/issues/1558
            totalElectricity: { $sum: "$payments.electricityCharges" },
            totalPaidElectricity: { $sum: "$payments.paidElectricityCharges" },
            totalPaid: { $sum: "$payments.totalPaid" },
            count: { $sum: 1 }
          }
        }
      ]);
      return payments;
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
