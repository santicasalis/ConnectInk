const { TattooArtist, Appointment, Customer } = require("../../db");

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
      duration,
      CustomerId: customerId,
      TattooArtistId: tattooArtist.id
    });
  
    // appointment.addTattooArtist(tattooArtist) // a chequear
    // appointment.addCustomer(customer); // a chequear
  } catch (error){
    console.log(error)
  }


  return "created appointment";
};

module.exports = createAppointment;
