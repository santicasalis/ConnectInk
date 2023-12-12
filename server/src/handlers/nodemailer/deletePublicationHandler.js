const deletePublication = require("../../controllers/nodemailer/deletePublication")

const deletePublicationHandler = async (req, res) => {
    const {email} = req.body

    await deletePublication(email)

    return res.status(200).send("email enviado")
}

module.exports = deletePublicationHandler