const welcomeRegister = require("../../controllers/nodemailer/welcomeRegister")

const welcomeArtistsHandler = async (req, res) => {
    const {email, name} = req.body

    await welcomeRegister(name, email)

    return res.status(200).send("email enviado")
}

module.exports = welcomeArtistsHandler