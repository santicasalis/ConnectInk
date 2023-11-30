const { TattooArtist, Appointment, Customer, CustomerTattooArtistAppointment } = require("../../db");

const createAppointment = async ({artistId, customerId, size, image, bodyPlace, description, dateAndTime, duration}) => {
  const tattooArtist = await TattooArtist.findByPk(artistId);
  const customer = await Customer.findByPk(customerId)

  try{
    const appointment = await Appointment.create({
      size, 
      image, 
      bodyPlace, 
      description,
      dateAndTime,
      duration
    });

    await CustomerTattooArtistAppointment.create({CustomerId: customerId, TattooArtistId: artistId, AppointmentId: appointment.id})
  
  } catch (error){
    console.log(error)
  }


  return "created appointment";
};

module.exports = createAppointment;
