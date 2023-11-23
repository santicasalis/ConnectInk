const getTattooArtistById = require("../../controllers/tattooArtistControllers/getTattooArtistById");

const getTattooArtistByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const tattooArtistById = await getTattooArtistById(id);
    if (tattooArtistById) {
      res.status(200).json(tattooArtistById);
    } else {
      res.status(404).json({ message: "Tattoo Artist not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getTattooArtistByIdHandler;
