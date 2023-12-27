const { Router } = require("express");
const createOrderHandler = require("../handlers/mercadoPagoHandlers/createOrderHandler");
const resultPaymentHandler = require("../handlers/mercadoPagoHandlers/resultPaymentHandler");
const receiveWebhookHandler = require("../handlers/mercadoPagoHandlers/receiveWebhookHandler");

const mercadoPagoRouter = Router();

mercadoPagoRouter.post("/", createOrderHandler);
mercadoPagoRouter.get("/result/:id", resultPaymentHandler);
mercadoPagoRouter.post("/webhook", receiveWebhookHandler);

module.exports = mercadoPagoRouter;
