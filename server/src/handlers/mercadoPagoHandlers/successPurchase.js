const successPurchase = (req, res) => {
  try {
    const { payment_id } = req.query;
    //agregar otra columna en la tabla "Appointment" para guardar el payment_id o hacer una nueva tabla?
    console.log(req);
    res.status(200).send("Pago aprobado");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = successPurchase;
