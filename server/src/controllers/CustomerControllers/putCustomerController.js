const { Customer } = require('../../db')

const updateCustomer = async (id, name, lastName, email, password, phone) => {
    const customerFound = await Customer.findByPk(id)

    if (customerFound) {
        await Customer.update(
            {
                where: { id: id }
            },
            {
                name: name,
                lastName: lastName,
                email: email,
                password: password,
                phone: phone
            }
        )
        return 'Update sucessful'
    } else {
        return 'cliente not found'
    }
}

module.exports = updateCustomer