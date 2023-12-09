// const { Customer } = require("../../db");
// const crypto = require("crypto");

// const updateCustomer = async (id, fullName, email, password, phone, image) => {
//   const customerFound = await Customer.findByPk(id);

//   if (customerFound) {
//     await Customer.update(
//       {
//         fullName: fullName,
//         email: email,
//         password: crypto.createHash("sha256").update(password).digest("hex"),
//         phone: phone,
//         image: image,
//       },
//       {
//         where: { id: id },
//       }
//     );
//     return "Update sucessful";
//   } else {
//     return "customer not found";
//   }
// };

// module.exports = updateCustomer;

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
