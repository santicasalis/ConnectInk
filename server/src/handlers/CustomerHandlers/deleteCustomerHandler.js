const deleteCustomer = require("../../controllers/customerControllers/deleteCustomer");

const deleteCustomerHandler = async (req, res) => {
  const { id } = req.params;

  const result = await deleteCustomer(id);

  try {
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = deleteCustomerHandler;
