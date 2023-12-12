require("dotenv").config()
const {NODEMAILER_USER} = process.env
const transporter = require("../../../config/nodemailer")
const cancelAppointment = require("../../utils/nodemailer/cancel-date")

const cancelDate = async (data) => {
    await transporter.sendMail({
        from: NODEMAILER_USER,
        to: data.artistEmail,
        subject:"Turno cancelado",
        html: `${cancelAppointment(data.customerName, data.dateData, data.depositPrice)}`
    })
    await transporter.sendMail({
        from: NODEMAILER_USER,
        to: data.customerEmail,
        subject:"Turno cancelado",
        html: `${cancelAppointment(data.artistName, data.dateData, data.depositPrice)}`
    })
}

module.exports = cancelDate