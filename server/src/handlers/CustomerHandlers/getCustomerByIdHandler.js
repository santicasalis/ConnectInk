const getCustomerById = require("../../controllers/customerControllers/getCustomerById");

const getCustomerByIdHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const customerById = await getCustomerById(id);

    if (customerById) {
      res.status(200).json(customerById);
    } else {
      res.status(400).json({ message: "Customer not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getCustomerByIdHandler;
