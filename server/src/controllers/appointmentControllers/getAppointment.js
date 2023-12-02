const { Appointment } = require("../../db");

async function getAppointmentController() {
  const appointments = Appointment.findAll();

  return appointments;
}

module.exports = getAppointmentController;
