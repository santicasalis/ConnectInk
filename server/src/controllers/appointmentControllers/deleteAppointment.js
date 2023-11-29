const { Appointment } = require("../../db");

const deleteAppointment = async (id) => {
  await Appointment.destroy({ where: { id } });

  return "deleted with success";
};

module.exports = deleteAppointment;
