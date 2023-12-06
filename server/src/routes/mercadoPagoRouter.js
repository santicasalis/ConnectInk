const { Router } = require("express");
const createOrder = require("../handlers/mercadoPagoHandlers/createOrder");
const successPaymentHandler = require("../handlers/mercadoPagoHandlers/successPaymentHandler");

const mercadoPagoRouter = Router();

mercadoPagoRouter.post("/", createOrder);
mercadoPagoRouter.get("/success", successPaymentHandler);

module.exports = mercadoPagoRouter;
