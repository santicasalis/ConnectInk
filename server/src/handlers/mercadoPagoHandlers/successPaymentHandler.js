const successPaymentHandler = async (req, res) => {
  const { id } = req.body;
  const { payment_id } = req.query;
  try {
    const confirmedAppointment = await successPayment(id, payment_id);
    res.status(200).send("Pago aprobado");
    console.log(confirmedAppointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = successPaymentHandler;
