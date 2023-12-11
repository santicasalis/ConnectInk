const createAppointment = require("../../controllers/appointmentControllers/createAppointment");

const createAppointmentHandler = async (req, res) => {
  const {
    tattooArtistId,
    customerId,
    size,
    image,
    bodyPlace,
    description,
    newDateAndTime,
  } = req.body;
  try {
    const newAppointment = await createAppointment({
      tattooArtistId,
      customerId,
      size,
      image,
      bodyPlace,
      description,
      newDateAndTime,
    });
    if (newAppointment.code === 201) {
      res
        .status(201)
        .json({ message: newAppointment.message, data: newAppointment.data });
    } else {
      res.status(newAppointment.code).json({ error: newAppointment.error });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = createAppointmentHandler;
