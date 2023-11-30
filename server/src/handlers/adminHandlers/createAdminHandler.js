const createAdmin = require('../../controllers/adminControllers/createAdmin')

const createAdminHandler = async (req, res) => {
    const { fullName, email, password } = req.body

    try {
        const newAdmin = await createAdmin(
            fullName,
            email,
            password,
        )
        res.status(200).json(newAdmin)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = createAdminHandler