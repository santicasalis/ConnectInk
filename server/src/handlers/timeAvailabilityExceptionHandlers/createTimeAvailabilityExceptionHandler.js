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
    if (timeAvailabilityException.code === 201) {
      res.status(201).json({
        message: timeAvailabilityException.message,
        data: timeAvailabilityException.data,
      });
    } else {
      res
        .status(timeAvailabilityException.code)
        .json({ error: timeAvailabilityException.error });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = createTimeAvailabilityExceptionHandler;
