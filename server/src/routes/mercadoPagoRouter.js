const { Router } = require("express");
const createOrder = require("../handlers/mercadoPagoHandlers/createOrder");
const successPaymentHandler = require("../handlers/mercadoPagoHandlers/successPaymentHandler");
const receiveWebhook = require("../handlers/mercadoPagoHandlers/receiveWebhook");

const mercadoPagoRouter = Router();

mercadoPagoRouter.post("/", createOrder);
mercadoPagoRouter.get("/failure", (req, res) => res.send("El pago falló"));
mercadoPagoRouter.get("/pending", (req, res) => res.send("Pago pendiente"));
mercadoPagoRouter.get("/success/:id", successPaymentHandler);
mercadoPagoRouter.get("/webhook", receiveWebhook);

module.exports = mercadoPagoRouter;
