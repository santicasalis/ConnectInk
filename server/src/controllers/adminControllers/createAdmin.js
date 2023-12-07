const { Admin } = require("../../db");
const crypto = require("crypto");

const createAdmin = async (fullName, email, password, tokenId) => {
  const admin = await Admin.create({
    fullName,
    email,
    password: crypto.createHash("sha256").update(password).digest("hex"),
    tokenId,
  });

  return admin;
};

module.exports = createAdmin;
