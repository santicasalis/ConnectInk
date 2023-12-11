require("dotenv").config();
const { MercadoPagoConfig, Preference } = require("mercadopago");
const { ACCESSTOKEN } = process.env;

const client = new MercadoPagoConfig({
  accessToken: ACCESSTOKEN,
});

const payment = new Preference(client);

const createOrderHandler = async (req, res) => {
  try {
    const { id, depositPrice, description } = req.body;
    let preference = {
      body: {
        items: [
          {
            id: id,
            title: "Pago de seña para la reserva del turno",
            quantity: 1,
            unit_price: depositPrice,
            currency_id: "ARS",
            description: description,
          },
        ],
        back_urls: {
          failure: `http://localhost:3001/payments/result/${id}`,
          pending: `http://localhost:3001/payments/result/${id}`,
          success: `http://localhost:3001/payments/result/${id}`,
        },
        notification_url:
          "https://webhook.site/aba5ed31-610a-4241-8b81-131b4e3025bc/payments/webhook",
      },
    };
    const response = await payment.create(preference);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = createOrderHandler;
