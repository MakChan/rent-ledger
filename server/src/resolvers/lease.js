export default {
  Query: {
    lease: async (parent, { _id }, { models }) => {
      return await models.Lease.findOne({ _id: _id }).populate("tenant");
    },
    leases: async (parent, { _id }, { models }) => {
      const room = await models.Room.findOne({ _id: _id });
      return room.leases;
    }
  },
  Mutation: {
    createTenantWithLease: async (parent, { lease, tenant }, { models }) => {
      const newTenant = models.tenant.create(tenant);
      return await models.Lease.create({
        ...lease,
        tenant: newTenant._id
      });
    },
    updateLease: async (parent, { _id, lease }, { models }) => {
      return await models.Lease.findOneAndUpdate({ _id: _id }, lease, {
        new: true
      });
    }
  }
};
