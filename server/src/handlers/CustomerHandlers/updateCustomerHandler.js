const updateCustomer = require("../../controllers/customerControllers/updateCustomer");

const putCustomerHandler = async (req, res) => {
  const { id } = req.params;
  const { fullName, email, password, phone, image } = req.body;
  try {
    const result = await updateCustomer(
      id,
      fullName,
      email,
      password,
      phone,
      image
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = putCustomerHandler;
