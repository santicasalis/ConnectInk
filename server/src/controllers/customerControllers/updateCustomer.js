const { Customer } = require("../../db");
const crypto = require("crypto");

const updateCustomer = async (id, fullName, email, password, phone, image) => {
  const customerFound = await Customer.findByPk(id);

  if (customerFound) {
    await Customer.update(
      {
        fullName: fullName,
        email: email,
        password: crypto.createHash("sha256").update(password).digest("hex"),
        phone: phone,
        image: image,
      },
      {
        where: { id: id },
      }
    );
    return "Update sucessful";
  } else {
    return "customer not found";
  }
};

module.exports = updateCustomer;
