const deleteAppointment = require("../../controllers/appointmentControllers/deleteAppointment");

const deleteAppointmentHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedAppointment = await deleteAppointment(id);
    res.status(200).json(deletedAppointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = deleteAppointmentHandler;
