const updateTattooArtist = require("../../controllers/tattooArtistControllers/updateTattooArtist");

const updateTattooArtistHandler = async (req, res) => {
  const { id } = req.params;
  const {
    newName,
    newLastName,
    newEmail,
    newPassword,
    newPhone,
    newLocation,
    newShopName,
  } = req.body;
  try {
    const updatedTattooArtist = await updateTattooArtist(
      id,
      newName,
      newLastName,
      newEmail,
      newPassword,
      newPhone,
      newLocation,
      newShopName
    );
    res.status(200).json(updatedTattooArtist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = updateTattooArtistHandler;
