const { Admin } = require('../../db')

const deleteAdmin = async (id) => {
    const adminFound = await Admin.findByPk(id)

    if (adminFound) {
        await Admin.update(
            {
                disabled: true
            },
            {
                where: { id: id }
            }
        )
        return 'Admin deleted successfully'
    } 
}

module.exports = deleteAdmin