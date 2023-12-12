const cancelDate = require("../../controllers/nodemailer/cancelDate")

const cancelDateHandler = async (req, res) => {
    const data = req.body

    await cancelDate(data)

    return res.status(200).send("email enviado")
}

module.exports = cancelDateHandler