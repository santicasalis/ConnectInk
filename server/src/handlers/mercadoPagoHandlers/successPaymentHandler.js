const successPayment = require("../../controllers/mercadoPagoControllers/successPayment");

const successPaymentHandler = async (req, res) => {
  const { id } = req.params;
  const { payment_id } = req.query;
  try {
    
    await successPayment(id, payment_id);
    res.status(200).redirect('http://localhost:3000/user-dashboard/reservas');
  
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = successPaymentHandler;
