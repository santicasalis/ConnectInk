const updateCustomer = require('../../controllers/customerControllers/updateCustomerController')

const putCustomerHandler = async (req, res) => {
    const { id } = req.params
    const { name, lastName, email, password, phone } = req.body
    
    try {
        const result = await updateCustomer(id, name, lastName, email, password, phone);

        res.status(200).json(result)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = putCustomerHandler