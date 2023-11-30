require("dotenv").config();
const { Router } = require("express");
const nodemailerRouter = Router();

const welcomeHandler = require("../handlers/nodemailer/welcomeHandler")

nodemailerRouter.post("/welcome", welcomeHandler)

module.exports = nodemailerRouter;
