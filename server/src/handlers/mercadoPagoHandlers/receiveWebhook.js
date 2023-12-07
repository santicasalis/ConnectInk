const { MercadoPagoConfig } = require("mercadopago");

const receiveWebhook = async (req, res) => {
  const payment = req.query;
  try {
    if (payment.type == "payment") {
      const data = await MercadoPagoConfig.payment.findById(payment["data.id"]);
      console.log(data);
    }
    return res.status(204);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};

module.exports = receiveWebhook;
