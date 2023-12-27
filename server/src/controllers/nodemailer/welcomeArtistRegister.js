require("dotenv").config()
const {NODEMAILER_USER} = process.env
const transporter = require("../../../config/nodemailer")
const welcome = require("../../utils/nodemailer/welcomeArtist")

const welcomeArtistRegister = async (name, email) => {
    await transporter.sendMail({
        from: NODEMAILER_USER,
        to: email,
        subject:"Bienvenido a ConnectInk",
        html: `${welcome(name)}`
    })
}

module.exports = welcomeArtistRegister