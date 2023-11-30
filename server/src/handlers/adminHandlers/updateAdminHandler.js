const updateAdmin = require("../../controllers/adminControllers/updateAdmin");

const updateAdminHandler = async (req, res) => {
  const { id } = req.params;
  const { fullName, email, password } = req.body;
  try {
    const updatedAdmin = await updateAdmin(id, fullName, email, password);
    res.status(200).json(updatedAdmin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = updateAdminHandler;
