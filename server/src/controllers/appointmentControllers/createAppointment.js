const { TattooArtist, Appointment, Customer } = require("../../db");

const createAppointment = async (artistId, customerId, size, image, bodyPlace, description, dateAndTime) => {
  const tattooArtist = await TattooArtist.findByPk(artistId);
  const customer = await Customer.findByPk(customerId)

  const appointment = await Appointment.create({
    dateAndTime
  });

  customer.addAppointment(appointment) // a chequear
  tattooArtist.addAppointment(appointment); // a chequear


  return "created appointment";
};

module.exports = createAppointment;
