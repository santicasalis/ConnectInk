const { Customer } = require('../../db')

const getCustomerById = async (id) => {
    const customer = await Customer.findByPk(id)
    return {
        id: customer.id,
        name: customer.name,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone
    }
}
module.exports = getCustomerById