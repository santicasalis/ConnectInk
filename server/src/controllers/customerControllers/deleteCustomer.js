const { Customer } = require('../../db')

const deleteCustomer = async (id) => {
    const customerFound = await Customer.findByPk(id)

    if (customerFound) {
        await Customer.update(
            {
                disabled: !customerFound.disabled
            },
            {
                where: { id: id }
            }
        )
        return 'update successfully'
    } 
}

module.exports = deleteCustomer