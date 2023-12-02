const getAppoointmentByArtistId = require("../../controllers/appointmentControllers/getAppointmentByArtistId");

const getAppointmentByArtistIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const appoointmentByArtistId = await getAppoointmentByArtistId(id);
    if (appoointmentByArtistId) {
      return res.status(200).json(appoointmentByArtistId);
    } else {
      res.status(404).json({ message: "Appointment not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = getAppointmentByArtistIdHandler;
