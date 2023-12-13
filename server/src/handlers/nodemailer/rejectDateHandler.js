const rejectDate = require("../../controllers/nodemailer/rejectDate")

const rejectDateHandler = async (req, res) => {
    const data = req.body

    await rejectDate(data)

    return res.status(200).send("email enviado")
}

module.exports = rejectDateHandler