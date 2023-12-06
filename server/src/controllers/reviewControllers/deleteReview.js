const { Review } = require("../../db");

const deleteReview = async (id) => {
  const reviewFound = await Review.findByPk(id)

  if (reviewFound) {

    await Review.update(
      { disabled: true },
      { where: { id } });

    return "Review deleted with success";
  } else {
    return "not found"
  }
};

module.exports = deleteReview;
