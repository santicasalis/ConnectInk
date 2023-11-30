const { Admin } = require("../../db");
const crypto = require("crypto");

const createAdmin = async (fullName, email, password) => {
  const admin = await Admin.create({
    fullName,
    email,
    password: crypto.createHash("sha256").update(password).digest("hex"),
  });

  return admin;
};

module.exports = createAdmin;
