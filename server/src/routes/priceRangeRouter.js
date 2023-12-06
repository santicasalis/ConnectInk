const { Router } = require("express");
const getPriceRangeHandler = require("../handlers/priceRangeHandlers/getPriceRangeHandler");
const getPriceRangeByIdHandler = require("../handlers/priceRangeHandlers/getPriceRangeByIdHandler");
const createPriceRangeHandler = require("../handlers/priceRangeHandlers/createPriceRangeHandler ");
const updatePriceRangeHandler = require("../handlers/priceRangeHandlers/updatePriceRangeHandler");

const priceRangeRouter = Router();

priceRangeRouter.get("/", getPriceRangeHandler);
priceRangeRouter.get("/:id", getPriceRangeByIdHandler);
priceRangeRouter.post("/", createPriceRangeHandler);
priceRangeRouter.put("/:id", updatePriceRangeHandler);

module.exports = priceRangeRouter;
