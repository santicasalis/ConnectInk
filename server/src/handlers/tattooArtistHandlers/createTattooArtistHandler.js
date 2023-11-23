const createTattooArtist = require("../../controllers/tattooArtistControllers/createTattooArtist");

const createTattooArtistHandler = async (req, res) => {
  const {
    name,
    lastName,
    email,
    phone,
    location,
    password,
    shopName,
    //tattooStyle,
  } = req.body;
  try {
    const newTattooArtist = await createTattooArtist(
      name,
      lastName,
      email,
      phone,
      location,
      password,
      shopName
      //tattooStyle
    );
    res.status(201).json(newTattooArtist);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = createTattooArtistHandler;
