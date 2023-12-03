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
    if (timeAvailability.code === 201) {
      res.status(201).json({
        message: timeAvailability.message,
        data: timeAvailability.data,
      });
    } else {
      res.status(timeAvailability.code).json({ error: timeAvailability.error });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = createTimeAvailabilityHandler;
