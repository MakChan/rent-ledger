export default {
  Query: {
    tenant: async (parent, { _id }, { models }) => {
      return await models.Tenant.findOne({ _id: _id });
    }
  }
};
