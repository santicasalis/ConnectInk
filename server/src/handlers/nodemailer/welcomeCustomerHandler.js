const welcomeCustomerRegister = require("../../controllers/nodemailer/welcomeCustomerRegister")

const welcomeCustomerHandler = async (req, res) => {
    const {email, name} = req.body

    await welcomeCustomerRegister(name, email)

    return res.status(200).send("email enviado")
}

module.exports = welcomeCustomerHandler