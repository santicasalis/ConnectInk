const resultPayment = require("../../controllers/mercadoPagoControllers/resultPayment");

const resultPaymentHandler = async (req, res) => {
  const { id } = req.params;
  const { payment_id, status } = req.query;

  try {
    const result = await resultPayment(id, payment_id, status);
    if (result.code === 200) {
      return res
        .status(200)
        .redirect("http://localhost:3000/user-dashboard/reservas");
    } else {
      return res.status(result.code).json({ error: result.error });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = resultPaymentHandler;
