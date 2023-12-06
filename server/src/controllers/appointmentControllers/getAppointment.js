const { Appointment } = require("../../db");

async function getAppointmentController() {
  const appointments = Appointment.findAll({ where: { disabled: false } });

  return appointments;
}

module.exports = getAppointmentController;
