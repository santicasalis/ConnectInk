const deleteAdmin = require('../../controllers/adminControllers/deleteAdmin')

const deleteAdminHandler = async (req, res) => {
    const { id } = req.params

    const result = await deleteAdmin(id);

    try {
        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = deleteAdminHandler