const deleteTattooArtist = require("../../controllers/tattooArtistControllers/deleteTattooArtist");

const deleteTattooArtistHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTattooArtist = await deleteTattooArtist(id);
    res.status(200).json(deletedTattooArtist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = deleteTattooArtistHandler;
