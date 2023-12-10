const failurePayment = require("../../controllers/mercadoPagoControllers/failurePayment");

const failurePaymentHandler = async (req, res) => {
  const { id } = req.params;

  try {
    await failurePayment(id);

    res.status(200).redirect("http://localhost:3000/user-dashboard/paymentFailure");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = failurePaymentHandler;
