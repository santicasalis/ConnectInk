const deletePublication = require("../../controllers/publicationControllers/deletePublication");

const deletePublicationHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPublication = await deletePublication(id);
    res.status(200).json(deletedPublication);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = deletePublicationHandler;
