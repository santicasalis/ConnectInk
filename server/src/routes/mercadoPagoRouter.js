const { Router } = require("express");
const createOrder = require("../handlers/mercadoPagoHandlers/createOrder");
const successPaymentHandler = require("../handlers/mercadoPagoHandlers/successPaymentHandler");
const receiveWebhook = require("../handlers/mercadoPagoHandlers/receiveWebhook");
const failurePaymentHandler = require ("../handlers/mercadoPagoHandlers/failurePaymentHandler")
const pendingPaymentHandler = require("../handlers/mercadoPagoHandlers/pendingPaymentHandler");

const mercadoPagoRouter = Router();

mercadoPagoRouter.post("/", createOrder);
mercadoPagoRouter.get("/failure/:id", failurePaymentHandler);
mercadoPagoRouter.get("/pending", pendingPaymentHandler);
mercadoPagoRouter.get("/success/:id", successPaymentHandler);
mercadoPagoRouter.post("/webhook", receiveWebhook);

module.exports = mercadoPagoRouter;
