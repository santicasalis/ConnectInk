const { Appointment } = require("../../db");

const getAppointmentById = async (id) => {
  const appointment = await Appointment.findByPk(id);

  return appointment;
};

module.exports = getAppointmentById;
