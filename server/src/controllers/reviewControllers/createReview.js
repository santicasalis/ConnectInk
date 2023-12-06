const { TattooArtist, Review, Customer } = require("../../db");

const createReview = async (artistId, customerId, comment, image, rating) => {
  const tattooArtist = await TattooArtist.findByPk(artistId);
  const customer = await Customer.findByPk(customerId)

  try{

    const review = await Review.create({
      comment, 
      image, 
      rating,
      TattooArtistId: artistId,
      CustomerId: customerId
    });
  } catch(error){
    console.log(error)
  }


  // customer.addReview(review) // a chequear
  // tattooArtist.addReview(review); // a chequear


  return "created Review";
};

module.exports = createReview;
