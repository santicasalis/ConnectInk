const { Customer } = require('../../db')

const deleteCustomer = async (id) => {
    const customerFound = await Customer.findByPk(id)

    if (customerFound) {
        await Customer.update(
            {
                where: { id: id }
            },
            {
                disabled: true
            }
        )
        return 'successful deletion'
    } 
}

module.exports = deleteCustomer