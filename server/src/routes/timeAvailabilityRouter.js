const { Router } = require("express");
const timeAvailabilityRouter = Router();

const getTimeAvailabilityHandler = require("../handlers/timeAvailabilityExceptionHandlers/getTimeAvailabilityExceptionHandler");
const getTimeAvailabilityByIdHandler = require("../handlers/timeAvailabilityExceptionHandlers/getTimeAvailabilityByIdExceptionHandler");
const deleteTimeAvailabilityHandler = require("../handlers/timeAvailabilityExceptionHandlers/deleteTimeAvailabilityExceptionHandler");
const createTimeAvailabilityHandler = require("../handlers/timeAvailabilityExceptionHandlers/createTimeAvailabilityExceptionHandler");
const updateTimeAvailabilityHandler = require("../handlers/timeAvailabilityExceptionHandlers/updateTimeAvailabilityExceptionHandler");

timeAvailabilityRouter.get("/", getTimeAvailabilityHandler);
timeAvailabilityRouter.get("/:id", getTimeAvailabilityByIdHandler);
timeAvailabilityRouter.delete("/:id", deleteTimeAvailabilityHandler);
timeAvailabilityRouter.post("/", createTimeAvailabilityHandler);
timeAvailabilityRouter.put("/", updateTimeAvailabilityHandler);

module.exports = timeAvailabilityRouter;
