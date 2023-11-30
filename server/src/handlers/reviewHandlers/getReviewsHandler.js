const getReviews = require("../../controllers/reviewControllers/getReviews");

const getReviewHandler = async (req, res) => {
  try {
    const reviews = await getReviews();
    if (reviews.length > 0) {
      return res.status(200).json(reviews);
    } else {
      res.status(404).json({ message: "Reviews not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getReviewHandler;
