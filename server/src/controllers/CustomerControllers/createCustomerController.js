const { Customer } = require('../../db')

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
    password,
    phone,
    image
  })
  return newCustomer
}

module.exports = createCustomer
