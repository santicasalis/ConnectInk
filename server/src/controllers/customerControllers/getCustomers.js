const { Customer } = require("../../db");

const getCustomers = async () => {
  const customers = await Customer.findAll({
    where: { disabled: false },
  });

  const customerCleaner = customers.map((customer) => ({
    id: customer.id,
    fullName: customer.fullName,
    email: customer.email,
    phone: customer.phone,
    image: customer.image,
    disabled: customer.disabled,
  }));
  return customerCleaner;
};

module.exports = getCustomers;
