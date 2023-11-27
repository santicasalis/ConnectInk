const { Customer } = require('../../db')

const updateCustomer = async (id, name, lastName, email, password, phone) => {
    const customerFound = await Customer.findByPk(id)

    if (customerFound) {
        await Customer.update(
            {
                name: name,
                lastName: lastName,
                email: email,
                password: password,
                phone: phone
            },
            {
                where: { id: id }
            }
        )
        return 'Update sucessful'
    } else {
        return 'customer not found'
    }
}

module.exports = updateCustomer