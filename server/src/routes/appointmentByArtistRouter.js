const { Router } = require("express");
const appointmentByArtistRouter = Router();

const getAppointmentByArtistIdHandler = require("../handlers/appointmentHandlers/getAppointmentByArtistIdHandler");

appointmentByArtistRouter.get("/:id", getAppointmentByArtistIdHandler);

module.exports = appointmentByArtistRouter;
