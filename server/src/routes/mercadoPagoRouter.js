const { Router } = require("express");
const createOrder = require("../handlers/mercadoPagoHandlers/createOrder");
const successPurchase = require("../handlers/mercadoPagoHandlers/successPurchase");

const mercadoPagoRouter = Router();

mercadoPagoRouter.post("/", createOrder);
mercadoPagoRouter.get("/success", successPurchase);

module.exports = mercadoPagoRouter;
