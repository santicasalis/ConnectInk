const getAdminById = require("../../controllers/adminControllers/getAdminById");

const getAdminByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const AdminById = await getAdminById(id);
    if (AdminById) {
      res.status(200).json(AdminById);
    } else {
      res.status(404).json({ message: "Admin not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getAdminByIdHandler;
