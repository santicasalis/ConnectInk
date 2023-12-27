const { Appointment } = require("../../db");

const resultPayment = async (id, payment_id, status) => {
  const appointmentFound = await Appointment.findByPk(id);
  if (appointmentFound) {
    await Appointment.update(
      {
        paymentId: payment_id,
        paymentStatus: status,
      },
      {
        where: { id: id },
      }
    );
    return {
      code: 200,
      message: "Appointment updated successfully",
      data: appointmentFound,
      paymentStatus: status
    };
  } else {
    return { code: 404, error: "Appointment not found" };
  }
};

module.exports = resultPayment;
