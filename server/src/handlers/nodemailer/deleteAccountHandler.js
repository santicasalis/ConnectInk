const deleteAccount = require("../../controllers/nodemailer/deleteAccount")

const deleteAccountHandler = async (req, res) => {
    const {email} = req.body

    await deleteAccount(email)

    return res.status(200).send("email enviado")
}

module.exports = deleteAccountHandler