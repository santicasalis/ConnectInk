const createAppointment = require("../../controllers/appointmentControllers/createAppointment");

const createAppointmentHandler = async (req, res) => {
  const { artistId, customerId, dateAndTime } = req.body;
  try {
    const newCreateAppointment = await createAppointment(
        artistId, 
        customerId, 
        dateAndTime
    );
    res.status(201).json(newCreateAppointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = createAppointmentHandler;
