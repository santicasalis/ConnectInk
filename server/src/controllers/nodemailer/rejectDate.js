require("dotenv").config()
const {NODEMAILER_USER} = process.env
const transporter = require("../../../config/nodemailer")
const rejectAppointment = require("../../utils/nodemailer/reject-date")

const rejectDate = async (data) => {
    await transporter.sendMail({
        from: NODEMAILER_USER,
        to: data.customerEmail,
        subject:"Turno no reservado",
        html: `${rejectAppointment(data.artistName, data.dateData)}`
    })
}

module.exports = rejectDate