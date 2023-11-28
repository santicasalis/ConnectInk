const { TattooArtist, Appointment, Customer } = require("../../db");

const createAppointment = async (artistId, customerId, dateAndTime) => {
  const tattooArtist = await TattooArtist.findByPk(artistId);
  const customer = await Customer.findByPk(customerId)

  const appointment = await Appointment.create({
    dateAndTime
  });

  customer.addAppointment(appointment)
  tattooArtist.addAppointment(appointment);


  return "created appointment";
};

module.exports = createAppointment;
