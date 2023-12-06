require("dotenv").config();
const { MercadoPagoConfig, Preference } = require("mercadopago");
const { ACCESSTOKEN } = process.env;

const client = new MercadoPagoConfig({
  accessToken: ACCESSTOKEN,
});

const payment = new Preference(client);

const createOrder = async (req, res) => {
  try {
    const { depositPrice, description } = req.body;
    let preference = {
      body: {
        items: [
          {
            title: "Seña para reservar turno",
            quantity: 1,
            unit_price: depositPrice,
            currency_id: "ARS",
            description: description,
          },
        ],
        //hay que definir las rutas
        back_urls: {
          failure: "",
          pending: "",
          success: "http://localhost:3001/payment/success",
        },
      },
    };
    const response = await payment.create(preference);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = createOrder;
