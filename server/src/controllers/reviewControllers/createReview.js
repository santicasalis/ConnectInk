const { TattooArtist, Review, Customer, Appointment } = require("../../db");

const createReview = async ({tattooArtistId, customerId, appointmentId,  comment, image, rating}) => {
 

  console.log(tattooArtistId, customerId,appointmentId);
   //chequea que exista el tatuador
   const tattooArtist = await TattooArtist.findByPk(tattooArtistId);
   if (tattooArtist === null) {
     return { code: 404, error: "Tattoo artist not found" };
   }
 
   //chequea que exista el cliente
   const customer = await Customer.findByPk(customerId);
   if (customer === null) {
     return { code: 404, error: "Customer not found" };
   }

    //chequea que exista el turno
    const appointment = await Appointment.findByPk(appointmentId);
    if (appointment === null) {
      return { code: 404, error: "Appointment not found" };
    }

  try{

    const review = await Review.create({
      comment, 
      image, 
      rating,
      TattooArtist_Review: tattooArtistId,
      Customer_Review: customerId,
      Appointment_Review: appointmentId
    });
    return {
      code: 201,
      message: "review created successfully",
      data: review,
    }
  } catch(error){
    console.log(error)
  }

  return "created Review";
};

module.exports = createReview;
