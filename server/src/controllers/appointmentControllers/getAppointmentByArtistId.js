const { Appointment, CustomerTattooArtistAppointment } = require("../../db");

const getAppoointmentByArtistId = async (id) => {
  const appointmentsByArtist = await CustomerTattooArtistAppointment.findAll({
    where: {TattooArtistId: id},
    include: [
      {
        model: Appointment,
      },
    ],
  });

  return appointmentsByArtist.map(appointments => appointments.Appointment);
};

module.exports = getAppoointmentByArtistId;
