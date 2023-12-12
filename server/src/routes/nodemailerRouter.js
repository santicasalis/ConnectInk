require("dotenv").config();
const { Router } = require("express");
const nodemailerRouter = Router();

const welcomeArtistHandler = require("../handlers/nodemailer/welcomeArtistHandler")
const welcomeCustomerHandler = require("../handlers/nodemailer/welcomeCustomerHandler")
const deleteAccountHandler = require("../handlers/nodemailer/deleteAccountHandler")
const deletePublicationHandler = require("../handlers/nodemailer/deletePublicationHandler");
const cancelDateHandler = require("../handlers/nodemailer/cancelDateHandler");
const confirmDateHandler = require("../handlers/nodemailer/confirmDateHandler");

nodemailerRouter.post("/welcomeArtist", welcomeArtistHandler)
nodemailerRouter.post("/welcomeCustomer", welcomeCustomerHandler)
nodemailerRouter.post("/deleteAccount", deleteAccountHandler)
nodemailerRouter.post("/deletePublication", deletePublicationHandler)
nodemailerRouter.post("/cancelDate", cancelDateHandler)
nodemailerRouter.post("/confirmDate", confirmDateHandler)


module.exports = nodemailerRouter;
