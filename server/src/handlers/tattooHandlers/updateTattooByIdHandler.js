const updateTattoo = require("../../controllers/tattooControllers/updateTattoo");

const updateTattooByIdHandler = async (req, res) => {
  const { id } = req.params;
  const { size, image, bodyPlace, duration } = req.body;
  try {
    const updatedTattoo = await updateTattoo(
      id,
      size,
      image,
      bodyPlace,
      duration
    );
    res.status(200).json(updatedTattoo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = updateTattooByIdHandler;
