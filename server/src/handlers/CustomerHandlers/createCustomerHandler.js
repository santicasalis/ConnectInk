const createCustomer = require("../../controllers/customerControllers/createCustomer");

const createCustomerHandler = async (req, res) => {
  const { tokenId, fullName, email, password, phone, image } = req.body;

  let noPassword = String(Math.random())

  try {
    const newCustomer = await createCustomer(
      tokenId,
      fullName,
      email,
      password || noPassword,
      phone,
      image
    );
    res.status(200).json(newCustomer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = createCustomerHandler;
