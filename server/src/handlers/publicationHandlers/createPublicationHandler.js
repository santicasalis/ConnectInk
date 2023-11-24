const createPublication = require("../../controllers/publicationControllers/createPublication");

const createPublicationHandler = async (req, res) => {
  const { artist_id, description, image } = req.body;

  const publication = await createPublication(artist_id, description, image);

  return res.json(publication);
};

module.exports = createPublicationHandler;
