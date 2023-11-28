const createCustomer = require('../../controllers/customerControllers/createCustomerController')

const createCustomerHandler = async (req, res) => {
    const { name, lastName, email, password, phone } = req.body

    try {
        const newCustomer = await createCustomer(
            name,
            lastName,
            email,
            password,
            phone
        )
        res.status(200).json(newCustomer)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = createCustomerHandler