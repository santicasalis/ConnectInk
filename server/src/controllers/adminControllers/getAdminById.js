const { Admin } = require("../../db");

const getAdminById = async (id) => {
  const admin = await Admin.findByPk(id);

  return admin;
};

module.exports = getAdminById;
