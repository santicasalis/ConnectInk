const getCustomers = require("../../controllers/customerControllers/getCustomers");

const getCustomersHandler = async (req, res) => {
  try {
    const customers = await getCustomers();
    if (customers.length) {
      res.status(200).json(customers);
    } else {
      res.status(400).json({ message: "non-existent clients" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getCustomersHandler;
