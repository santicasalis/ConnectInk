const createComment = require("../../controllers/commentControllers/createComment");

const createCommentHandler = async (req, res) => {
  const {
   customerId,
   publicationId,
   text
  } = req.body;
  try {
    const newComment = await createComment({
        customerId,
        publicationId,
        text
    });
    if (newComment.code === 201) {
      res
        .status(201)
        .json({ message: newComment.message, data: newComment.data });
    } else {
      res.status(newComment.code).json({ error: newComment.error });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = createCommentHandler;
