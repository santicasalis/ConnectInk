const {Customer} = require('../../db')

const createCustomer = async (
    name,
    lastName,
    email,
    password,
    phone
  ) => {
    const newCustomer = await Customer.create({
        name,
        lastName,
        email,
        password,
        phone
    })
    return newCustomer
}

module.exports = createCustomer
