const { Customer } = require("../../db");

const getCustomers = async () => {
  const customers = await Customer.findAll();

  return customers;
};

module.exports = getCustomers;
