const createPublication = require("../../controllers/publicationControllers/createPublication");

const createPublicationHandler = async (req, res) => {
  const { tattooArtistId, title, description, image } = req.body;
  try {
    const newPublication = await createPublication(
      tattooArtistId,
      title,
      description,
      image
    );
    res.status(201).json(newPublication);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = createPublicationHandler;
