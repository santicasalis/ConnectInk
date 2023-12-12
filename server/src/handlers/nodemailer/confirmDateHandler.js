const confirmDate = require("../../controllers/nodemailer/confirmDate")

const confirmDateHandler = async (req, res) => {
    const data = req.body

    await confirmDate(data)

    return res.status(200).send("email enviado")
}

module.exports = confirmDateHandler