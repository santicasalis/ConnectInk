const getAppointmentById = require("../../controllers/appointmentControllers/getAppointmentById");

const getAppointmentByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await getAppointmentById(id);
    if (appointment) {
      return res.status(200).json(appointment);
    } else {
      res.status(404).json({ message: "Appointment not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = getAppointmentByIdHandler;
