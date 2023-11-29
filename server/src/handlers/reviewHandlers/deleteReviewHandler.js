const deleteReview = require("../../controllers/reviewControllers/deleteReview");

const deleteReviewHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedReview = await deleteReview(id);
    res.status(200).json(deletedReview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = deleteReviewHandler;
