require("dotenv").config()
const {NODEMAILER_USER} = process.env
const transporter = require("../../../config/nodemailer")
const welcome = require("../../utils/nodemailer/welcome")

const welcomeRegister = async (name, email) => {
    await transporter.sendMail({
        from: NODEMAILER_USER,
        to: email,
        subject:"Welcome to ConnectInk",
        html: `${welcome(name)}`
    })
}

module.exports = welcomeRegister