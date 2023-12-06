const { Appointment } = require("../../db");

const deleteAppointment = async (id) => {
  const appointmentFound = await Appointment.findByPk(id)

  if (appointmentFound) {

    await Appointment.update(
      { disabled: true },
      { where: { id } });

    return "Appointment deleted with success";
  } else {
    return "not found"
  }
};

module.exports = deleteAppointment;
