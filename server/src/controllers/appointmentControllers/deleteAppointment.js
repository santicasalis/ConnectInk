const { Appointment } = require("../../db");

const deleteAppointment = async (id) => {
  await Appointment.destroy({ where: { id } });

  return "Appointment deleted with success";
};

module.exports = deleteAppointment;
