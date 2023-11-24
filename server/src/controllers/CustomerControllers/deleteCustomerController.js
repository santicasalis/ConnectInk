const { Customer } = require('../../db')

const deleteCustomer = async (id) => {
    const customerFound = await Customer.findByPk(id)

    if (customerFound) {
        await Customer.update(
            {
                disabled: true
            },
            {
                where: { id: id }
            }
        )
        return 'Customer deleted successfully'
    } 
}

module.exports = deleteCustomer