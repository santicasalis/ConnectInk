require("dotenv").config()
const {NODEMAILER_USER} = process.env
const transporter = require("../../../config/nodemailer")
const createReservation = require("../../utils/nodemailer/confirm-reservation")

const confirmDate = async (data) => {
    await transporter.sendMail({
        from: NODEMAILER_USER,
        to: data.artistEmail,
        subject:"Turno agendado",
        html: `${createReservation(data.customerName, data.dateData)}`
    })
    await transporter.sendMail({
        from: NODEMAILER_USER,
        to: data.customerEmail,
        subject:"Turno agendado",
        html: `${createReservation(data.artistName, data.dateData)}`
    })
}

module.exports = confirmDate