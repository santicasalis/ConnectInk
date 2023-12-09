require("dotenv").config();
const { MercadoPagoConfig, Preference } = require("mercadopago");
const { ACCESSTOKEN } = process.env;

const client = new MercadoPagoConfig({
  accessToken: ACCESSTOKEN,
});

const payment = new Preference(client);

const createOrder = async (req, res) => {
  try {
    const { id, depositPrice, description } = req.body;
    let preference = {
      body: {
        items: [
          {
            id: id,
            title: "Seña para reservar turno",
            quantity: 1,
            unit_price: depositPrice,
            currency_id: "BRL",
            description: description,
          },
        ],
        back_urls: {
          failure: `http://localhost:3001/payment/failure/${id}`,
          pending: "http://localhost:3001/payment/pending",
          success: `http://localhost:3001/payment/success/${id}`,
        },
        notification_url: "https://webhook.site/95a6fd8f-442f-407a-92ac-54976654b519/payment/webhook"
      },
    };
    const response = await payment.create(preference);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = createOrder;
