const getPublicationById = require("../../controllers/publicationControllers/getPublicationById");

const getPublicationByIdHandler = async (req, res) => {
  const { id } = req.params;

  const publication = await getPublicationById(id);

  return res.status(200).json(publication);
};
module.exports = getPublicationByIdHandler;
