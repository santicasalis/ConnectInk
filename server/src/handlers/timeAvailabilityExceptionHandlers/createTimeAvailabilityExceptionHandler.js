const createTimeAvailability = require("../../controllers/timeAvailabilityControllers/createTimeAvailabilityException");

const createTimeAvailabilityHandler = async (req, res) => {
  const { artistId, date, initialHour, finalHour } = req.body;
  try {
    const timeAvailability = await createTimeAvailability(
      artistId,
      date,
      initialHour,
      finalHour
    );
    res.status(201).json(timeAvailability);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = createTimeAvailabilityHandler;
