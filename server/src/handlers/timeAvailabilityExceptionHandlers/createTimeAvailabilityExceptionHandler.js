const createTimeAvailabilityException = require("../../controllers/timeAvailabilityExceptionControllers/createTimeAvailabilityException");

const createTimeAvailabilityExceptionHandler = async (req, res) => {
  const { tattooArtistId, date, initialHour, finalHour } = req.body;
  try {
    const timeAvailabilityException = await createTimeAvailabilityException(
      tattooArtistId,
      date,
      initialHour,
      finalHour
    );
    res.status(201).json(timeAvailabilityException);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = createTimeAvailabilityExceptionHandler;
