const createTattooArtist = require("../../controllers/tattooArtistControllers/createTattooArtist");

const createTattooArtistHandler = async (req, res) => {
  const {
    tokenId,
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
    tattooStyle,
  } = req.body;
  try {
    const newTattooArtist = await createTattooArtist(
      tokenId,
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
      tattooStyle
    );
    res.status(201).json(newTattooArtist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = createTattooArtistHandler;
