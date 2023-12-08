const { Appointment } = require("../../db");

const failurePayment = async (id) => {

  const appointmentFound = await Appointment.findByPk(id);
  if (appointmentFound) {
    await Appointment.destroy(
      {
        where: { id: id },
      }
    );
    return appointmentFound;
  } else {
    return "Appointment not found";
  }
};

module.exports = failurePayment;
