const getCustomersDisabled = require("../../controllers/customerDisabledControllers/getCustomerDisabledController");

const getCustomersDisabledHandler = async (req, res) => {
  try {
    const customers = await getCustomersDisabled();
    if (customers.length) {
      res.status(200).json(customers);
    } else {
      res.status(400).json({ message: "Customers not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getCustomersDisabledHandler;
