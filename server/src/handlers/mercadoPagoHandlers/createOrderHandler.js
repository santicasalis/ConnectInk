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
          "https://webhook.site/95a6fd8f-442f-407a-92ac-54976654b519/payments/webhook",
      },
    };
    const response = await payment.create(preference);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = createOrderHandler;
