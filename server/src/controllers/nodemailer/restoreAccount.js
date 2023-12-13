require("dotenv").config()
const {NODEMAILER_USER} = process.env
const transporter = require("../../../config/nodemailer")
const restoreUser = require("../../utils/nodemailer/restore-user")

const restoreAccount = async (email) => {
    await transporter.sendMail({
        from: NODEMAILER_USER,
        to: email,
        subject:"Cuenta restaurada",
        html: restoreUser
    })
}

module.exports = restoreAccount