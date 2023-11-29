const { Admin } = require('../../db')

const updateAdmin = async (id, fullName, email, password) => {
    const adminFound = await Admin.findByPk(id)

    if (adminFound) {
        await Admin.update(
            {
                fullName: fullName,
                email: email,
                password: password,
            },
            {
                where: { id: id }
            }
        )
        return 'Update sucessful'
    } else {
        return 'Admin not found'
    }
}

module.exports = updateAdmin