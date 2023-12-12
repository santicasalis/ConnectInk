const { Router } = require("express");
const getCustomerdisabledHandler = require("../handlers/customerDisabledHandlers/getCustomersDisabledHandler");

const customerDisabledRouter = Router();

customerDisabledRouter.get("/", getCustomerdisabledHandler);

module.exports = customerDisabledRouter;
