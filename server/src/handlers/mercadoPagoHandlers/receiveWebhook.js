const { MercadoPagoConfig } = require("mercadopago");

const receiveWebhook = async (req, res) => {
  const payment = req.body;
  try {
    if (payment.type === "payment") {
      await MercadoPagoConfig.payment.findById(payment.data.id);
      return res.status(200).send("OK");
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = receiveWebhook;
