const likePublication = require("../../controllers/likesControllers/likePublication");

const likePublicationHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const message = await likePublication(id);
    res.status(200).json({ message });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = likePublicationHandler;
