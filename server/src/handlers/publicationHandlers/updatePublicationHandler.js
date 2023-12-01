const updatePublication = require("../../controllers/publicationControllers/updatePublication");

const updatePublicationHandler = async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  try {
    const updatedPublication = await updatePublication(id, description);
    res.status(200).json(updatedPublication);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = updatePublicationHandler;
