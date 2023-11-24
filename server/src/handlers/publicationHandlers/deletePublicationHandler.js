const deletePublication = require("../../controllers/publicationControllers/deletePublication");

const deletePublicationHandler = async (req, res) => {
  const { id } = req.body;

  const response = await deletePublication(id);

  return res.json(response);
};

module.exports = deletePublicationHandler;
