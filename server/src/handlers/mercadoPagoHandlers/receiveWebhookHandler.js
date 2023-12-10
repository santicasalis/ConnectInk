require("dotenv").config();
const { MercadoPagoConfig, Payment } = require("mercadopago");
const { ACCESSTOKEN } = process.env;
const resultPayment = require("../../controllers/mercadoPagoControllers/resultPayment");

const client = new MercadoPagoConfig({
  accessToken: ACCESSTOKEN,
});

const payment = new Payment(client);

const receiveWebhookHandler = async (req, res) => {
  const paymentQuery = req.query;
  try {
    if (paymentQuery.type === "payment") {
      const result = await payment.get({
        id: paymentQuery["data.id"],
      });
      const updatePaymentResult = await resultPayment(
        result.additional_info.items[0].id,
        paymentQuery["data.id"],
        result.status
      );
      if (updatePaymentResult.code === 200) {
        return res
          .status(200)
          .redirect("http://localhost:3000/user-dashboard/reservas");
      } else {
        return res
          .status(updatePaymentResult.code)
          .json({ error: updatePaymentResult.error });
      }
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = receiveWebhookHandler;
