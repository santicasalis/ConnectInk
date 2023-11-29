const { Router } = require("express");
const appointmentRouter = Router();

const getAppointmentHandler = require("../handlers/appointmentHandlers/getAppointmentHandler");
const getAppointmentByIdHandler = require("../handlers/appointmentHandlers/getAppointmentByIdHandler");
const createAppointmentHandler = require("../handlers/appointmentHandlers/createAppointmentHandler");
const deleteAppointmentHandler = require("../handlers/appointmentHandlers/deleteAppointmentHandler");

appointmentRouter.get("/", getAppointmentHandler);
appointmentRouter.get("/:id", getAppointmentByIdHandler);
appointmentRouter.post("/", createAppointmentHandler);
appointmentRouter.delete("/:id", deleteAppointmentHandler);

module.exports = appointmentRouter;
