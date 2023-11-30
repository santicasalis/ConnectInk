const { Customer } = require('../../db')

const getCustomerById = async (id) => {
    const customer = await Customer.findByPk(id)
    return {
        tokenId: customer.tokenId,
        fullName: customer.fullName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        image: customer.image
    }
}
module.exports = getCustomerById