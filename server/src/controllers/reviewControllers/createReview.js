const { TattooArtist, Review, Customer } = require("../../db");

const createReview = async (artistId, customerId, comment, image, rating) => {
  const tattooArtist = await TattooArtist.findByPk(artistId);
  const customer = await Customer.findByPk(customerId)

  const review = await Review.create({
    comment, 
    image, 
    rating
  });

  customer.addReview(review) // a chequear
  tattooArtist.addReview(review); // a chequear


  return "created Review";
};

module.exports = createReview;
