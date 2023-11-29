const { Customer } = require('../../db')

const updateCustomer = async (id, fullName, email, password, phone, image) => {
    const customerFound = await Customer.findByPk(id)

    if (customerFound) {
        await Customer.update(
            {
                fullName: fullName,
                email: email,
                password: password,
                phone: phone,
                image: image
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