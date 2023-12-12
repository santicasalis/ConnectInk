require("dotenv").config()
const {NODEMAILER_USER} = process.env
const transporter = require("../../../config/nodemailer")
const deletePost = require("../../utils/nodemailer/delete-publication")

const deletePublication = async (email) => {
    await transporter.sendMail({
        from: NODEMAILER_USER,
        to: email,
        subject:"Publicacion eliminada",
        html: deletePost
    })
}

module.exports = deletePublication