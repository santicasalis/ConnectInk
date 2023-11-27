const { Router } = require("express");
const timeAvailabilityRouter = Router();

const getTimeAvailabilityHandler = require("../handlers/timeAvailabilityHandlers/getTimeAvailabilityHandler");
const getTimeAvailabilityByIdHandler = require("../handlers/timeAvailabilityHandlers/getTimeAvailabilityByIdHandler");
const deleteTimeAvailabilityHandler = require("../handlers/timeAvailabilityHandlers/deleteTimeAvailabilityHandler");
const createTimeAvailabilityHandler = require("../handlers/timeAvailabilityHandlers/createTimeAvailabilityHandler");

timeAvailabilityRouter.get("/", getTimeAvailabilityHandler);
timeAvailabilityRouter.get("/:id", getTimeAvailabilityByIdHandler);
timeAvailabilityRouter.delete("/:id", deleteTimeAvailabilityHandler);
timeAvailabilityRouter.post("/", createTimeAvailabilityHandler);

module.exports = timeAvailabilityRouter;
