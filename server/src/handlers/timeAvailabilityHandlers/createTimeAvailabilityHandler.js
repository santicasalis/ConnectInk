const createTimeAvailability = require("../../controllers/timeAvailabilityControllers/createTimeAvailability");

const createTimeAvailabilityHandler = async (req, res) => {
  const { tattooArtistId, day, initialHour, finalHour } = req.body;
  try {
    const timeAvailability = await createTimeAvailability(
      tattooArtistId,
      day,
      initialHour,
      finalHour
    );
    res.status(201).json(timeAvailability);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = createTimeAvailabilityHandler;
