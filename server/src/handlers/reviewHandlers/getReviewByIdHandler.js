const getReviewById = require("../../controllers/reviewControllers/getReviewById");

const getReviewByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await getReviewById(id);
    if (review) {
      return res.status(200).json(review);
    } else {
      res.status(404).json({ message: "Review not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = getReviewByIdHandler;
