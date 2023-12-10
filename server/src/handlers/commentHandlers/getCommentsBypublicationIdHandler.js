const getCommentsBypublicationId = require("../../controllers/commentControllers/getCommentsByPublicationId");

const getCommentsBypublicationIdHandler = async (req, res) => {
  const {
   publicationId
  } = req.body;

  console.log(publicationId);
  try {
    const comments = await getCommentsBypublicationId({
        publicationId
    });
    if (comments.code === 201) {
      res
        .status(201)
        .json({ data: comments.data });
    } else {
      res.status(comments.code).json({ error: comments.error });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getCommentsBypublicationIdHandler;
