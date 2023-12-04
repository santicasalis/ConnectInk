const { Admin } = require("../../db");
const crypto = require("crypto");
const updateAdmin = async (id, fullName, email, password) => {
  const adminFound = await Admin.findByPk(id);

  if (adminFound) {
    await Admin.update(
      {
        fullName: fullName,
        email: email,
        password: crypto.createHash("sha256").update(password).digest("hex"),
      },
      {
        where: { id: id },
      }
    );
    return "Update sucessful";
  } else {
    return "Admin not found";
  }
};

module.exports = updateAdmin;
