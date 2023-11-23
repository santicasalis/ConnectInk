const { Customer } = require("../../db");

const getCustomers = async () => {
  const customers = await Customer.findAll({where:{disabled:false}});

  return customers;
};

module.exports = getCustomers;
