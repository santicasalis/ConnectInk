const { Customer } = require("../../db");
const crypto = require("crypto");

const createCustomer = async (
  tokenId,
  fullName,
  email,
  password,
  phone,
  image
) => {
  const newCustomer = await Customer.create({
    tokenId,
    fullName,
    email,
    password: crypto.createHash("sha256").update(password).digest("hex"),
    phone,
    image,
  });
  return newCustomer;
};

module.exports = createCustomer;
