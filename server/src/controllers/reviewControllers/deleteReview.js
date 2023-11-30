const { Review } = require("../../db");

const deleteReview = async (id) => {
  await Review.destroy({ where: { id } });

  return "deleted with success";
};

module.exports = deleteReview;
