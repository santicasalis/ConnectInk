const restoreAccount = require("../../controllers/nodemailer/restoreAccount")

const restoreAccountHandler = async (req, res) => {
    const {email} = req.body

    await restoreAccount(email)

    return res.status(200).send("email enviado")
}

module.exports = restoreAccountHandler