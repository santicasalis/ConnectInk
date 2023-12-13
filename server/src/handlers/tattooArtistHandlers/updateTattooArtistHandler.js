const updateTattooArtist = require("../../controllers/tattooArtistControllers/updateTattooArtist");

const updateTattooArtistHandler = async (req, res) => {
  const { id } = req.params;
  const {
    fullName,
    email,
    password,
    phone,
    instagram,
    description,
    address,
    location,
    shopName,
    image,
    tattooStyles
  } = req.body;
  try {
    const updatedTattooArtist = await updateTattooArtist(
      {id,
      fullName,
      email,
      password,
      phone,
      instagram,
      description,
      address,
      location,
      shopName,
      image,
      tattooStyles}
    );
    res.status(200).json(updatedTattooArtist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = updateTattooArtistHandler;
