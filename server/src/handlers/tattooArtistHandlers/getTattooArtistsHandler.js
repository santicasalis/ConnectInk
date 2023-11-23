const getTattooArtists = require("../../controllers/tattooArtistControllers/getTattooArtists");

const getTattooArtistsHandler = async (req, res) => {
  try {
    const allTattooArtists = await getTattooArtists();
    if (allTattooArtists.length > 0) {
      res.status(200).json(allTattooArtists);
    } else {
      res.status(404).json({ message: "Tattoo Artists not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getTattooArtistsHandler;
