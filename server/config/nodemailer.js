const nodemailer = require("nodemailer")
require("dotenv").config()

const {NODEMAILER_USER, NODEMAILER_PASS} = process.env

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: NODEMAILER_USER,
        pass: NODEMAILER_PASS
    }
})

transporter
    .verify()
    .then(() => console.log("todo bien"))
    .catch((error) => console.error(error))

module.exports = transporter