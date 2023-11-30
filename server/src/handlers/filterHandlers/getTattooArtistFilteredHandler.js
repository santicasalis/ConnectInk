const getTattooArtistFiltered = require("../../controllers/filterControllers/getTattooArtistFilteredController");

const getTattooArtistFilteredHandler = async (req, res) => {
  const { location, name, tattooStyle } = req.body;
  try {
    const tattooArtistsFound = await getTattooArtistFiltered(
      location,
      name,
      tattooStyle
    );
    res.status(200).json(tattooArtistsFound);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getTattooArtistFilteredHandler;
