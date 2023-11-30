const { Router } = require("express");
const getPriceRangeHandler = require("../handlers/priceRangeHandlers/getPriceRangeHandler");
const getPriceRangeByIdHandler = require("../handlers/priceRangeHandlers/getPriceRangeByIdHandler");
const createPriceRangeHandler = require("../handlers/priceRangeHandlers/createPriceRangeHandler ");
const updatePriceRangeHandler = require("../handlers/priceRangeHandlers/updatePriceRangeHandler");

const PriceRangeRouter = Router();

PriceRangeRouter.get("/", getPriceRangeHandler);
PriceRangeRouter.get("/:id", getPriceRangeByIdHandler);
PriceRangeRouter.post("/", createPriceRangeHandler);
PriceRangeRouter.put("/:id", updatePriceRangeHandler);

module.exports = PriceRangeRouter;
