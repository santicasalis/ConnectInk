const welcomeArtistRegister = require("../../controllers/nodemailer/welcomeArtistRegister")

const welcomeArtistsHandler = async (req, res) => {
    const {email, name} = req.body

    await welcomeArtistRegister(name, email)

    return res.status(200).send("email enviado")
}

module.exports = welcomeArtistsHandler