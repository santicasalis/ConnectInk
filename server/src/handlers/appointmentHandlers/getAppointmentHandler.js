const getAppointment = require("../../controllers/appointmentControllers/getAppointment");

const getAppointmentHandler = async (req, res) => {
  try {
    const Appointments = await getAppointment();
    if (Appointments.length > 0) {
      return res.status(200).json(Appointments);
    } else {
      res.status(404).json({ message: "Appointments not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getAppointmentHandler;
