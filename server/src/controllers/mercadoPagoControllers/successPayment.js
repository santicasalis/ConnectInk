const { Appointment } = require("../../db");

const successPayment = async (id, payment_id) => {
  const appointmentFound = await Appointment.findByPk(id);
  if (appointmentFound) {
    await Appointment.update(
      {
        paymentId: payment_id,
      },
      {
        where: { id: id },
      }
    );
    return appointmentFound;
  } else {
    return "Appointment not found";
  }
};

module.exports = successPayment;
