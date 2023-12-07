const { Appointment } = require("../../db");

const successPayment = async (payment_id) => {
  const appointmentFound = await Appointment.findOne({order:[["createdAt", "desc"]]});
  console.log(appointmentFound);
  if (appointmentFound) {
    await Appointment.update(
      {
        paymentId: payment_id,
      },
      {
        where: { id: appointmentFound.id },
      }
    );
    return appointmentFound;
  } else {
    return "Appointment not found";
  }
};

module.exports = successPayment;
