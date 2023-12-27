
const { Customer } = require("../../db");
const crypto = require("crypto");

const updateCustomer = async (id, fullName, email, password, phone, image) => {
  const customerFound = await Customer.findByPk(id);

  if (customerFound) {
    const updateData = {};
    if (fullName) updateData.fullName = fullName;
    if (email) updateData.email = email;
    if (password) {
      updateData.password = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");
    }
    if (phone) updateData.phone = phone;
    if (image) updateData.image = image;

    await Customer.update(updateData, { where: { id: id } });
    return "Update successful";
  } else {
    return "Customer not found";
  }
};

module.exports = updateCustomer;
