const updateTimeAvailabilityException = require("../../controllers/timeAvailabilityExceptionControllers/updateTimeAvailabilityException");

const updateTimeAvailabilityExceptionHandler = async (req, res) => {
  const { id } = req.params;
  const { date, initialHour, finalHour } = req.body;

  try {
    const timeAvailabilityException = await updateTimeAvailabilityException(
      id,
      date,
      initialHour,
      finalHour
    );

    res.status(200).json(timeAvailabilityException);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = updateTimeAvailabilityExceptionHandler;
