const getAdmin = require("../../controllers/adminControllers/getAdmin");

const getAdminHandler = async (req, res) => {
  try {
    const Admins = await getAdmin();
    if (Admins.length > 0) {
      return res.status(200).json(Admins);
    } else {
      res.status(404).json({ message: "Admins not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getAdminHandler;
