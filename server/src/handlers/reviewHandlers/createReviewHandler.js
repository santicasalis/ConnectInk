const createReview = require("../../controllers/reviewControllers/createReview");

const createReviewHandler = async (req, res) => {
    const { artistId, customerId, comment, image, rating } = req.body;
    try {
        const newCreateReview = await createReview(
            artistId,
            customerId,
            comment,
            image,
            rating
        );
        res.status(201).json(newCreateReview);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = createReviewHandler;
