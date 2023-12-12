require("dotenv").config()
const {NODEMAILER_USER} = process.env
const transporter = require("../../../config/nodemailer")
const deleteUser = require("../../utils/nodemailer/delete-user")

const deleteAccount = async (email) => {
    await transporter.sendMail({
        from: NODEMAILER_USER,
        to: email,
        subject:"Cuenta eliminada",
        html: deleteUser
    })
}

module.exports = deleteAccount