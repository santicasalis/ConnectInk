require("dotenv").config()
const {Router} = require("express")
const transporter = require("../../config/nodemailer")
const nodemailerRouter = Router()
const {NODEMAILER_USER} = process.env

// nodemailerRouter.post()


module.exports = nodemailerRouter