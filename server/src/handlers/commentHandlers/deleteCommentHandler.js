const deleteComment = require("../../controllers/commentControllers/deleteComment");

const deleteCommentHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedComment = await deleteComment({id});
    res.status(200).json(deletedComment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = deleteCommentHandler;
