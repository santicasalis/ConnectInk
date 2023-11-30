const { Router } = require("express");
const timeAvailabilityExceptionRouter = Router();

const getTimeAvailabilityExceptionHandler = require("../handlers/timeAvailabilityExceptionHandlers/getTimeAvailabilityExceptionHandler");
const createTimeAvailabilityExceptionHandler = require("../handlers/timeAvailabilityExceptionHandlers/createTimeAvailabilityExceptionHandler");
const getTimeAvailabilityExceptionByIdHandler = require("../handlers/timeAvailabilityExceptionHandlers/getTimeAvailabilityByIdExceptionHandler");
const updateTimeAvailabilityExceptionHandler = require("../handlers/timeAvailabilityExceptionHandlers/updateTimeAvailabilityExceptionHandler");
const deleteTimeAvailabilityExceptionHandler = require("../handlers/timeAvailabilityExceptionHandlers/deleteTimeAvailabilityExceptionHandler");

timeAvailabilityExceptionRouter.get("/", getTimeAvailabilityExceptionHandler);
timeAvailabilityExceptionRouter.get(
  "/:id",
  getTimeAvailabilityExceptionByIdHandler
);
timeAvailabilityExceptionRouter.post(
  "/",
  createTimeAvailabilityExceptionHandler
);
timeAvailabilityExceptionRouter.put(
  "/:id",
  updateTimeAvailabilityExceptionHandler
);
timeAvailabilityExceptionRouter.delete(
  "/:id",
  deleteTimeAvailabilityExceptionHandler
);

module.exports = timeAvailabilityExceptionRouter;
