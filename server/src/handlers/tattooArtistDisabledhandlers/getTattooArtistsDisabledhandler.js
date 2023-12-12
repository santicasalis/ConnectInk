const getTattooArtistsDisabled = require("../../controllers/tattooArtistDisabledControllers/getTattooArtistsDisabled");

const getTattooArtistsHandlerDisabled = async (req, res) => {
  try {
    const allTattooArtistsDisabled = await getTattooArtistsDisabled();
    if (allTattooArtistsDisabled.length > 0) {
      res.status(200).json(allTattooArtistsDisabled);
    } else {
      res.status(404).json({ message: "Tattoo Artists not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getTattooArtistsHandlerDisabled;
