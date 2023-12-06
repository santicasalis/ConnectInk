const createReview = require("../../controllers/reviewControllers/createReview");

const createReviewHandler = async (req, res) => {
    const { tattooArtistId, customerId, appointmentId, comment, image, rating } = req.body;
    try {
        const newReview = await createReview({
            tattooArtistId,
            customerId,
            appointmentId,
            comment,
            image,
            rating
        });

        if (newReview.code === 201) {
            res
                .status(201)
                .json({ message: newReview.message, data: newReview.data });
        } else {
            res.status(newReview.code).json({ error: newReview.error });
        }

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = createReviewHandler;
