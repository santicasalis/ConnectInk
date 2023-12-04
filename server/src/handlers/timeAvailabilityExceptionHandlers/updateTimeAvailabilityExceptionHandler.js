const updateTimeAvailabilityException = require("../../controllers/timeAvailabilityExceptionControllers/updateTimeAvailabilityException");

const updateTimeAvailabilityExceptionHandler = async (req, res) => {
  const { id } = req.params;
  const { initialHour, finalHour } = req.body;

  try {
    const updatedtimeAvailabilityException =
      await updateTimeAvailabilityException(id, initialHour, finalHour);
    if (updatedtimeAvailabilityException.code === 201) {
      res.status(201).json({
        message: updatedtimeAvailabilityException.message,
        data: updatedtimeAvailabilityException.data,
      });
    } else {
      res
        .status(updatedtimeAvailabilityException.code)
        .json({ error: updatedtimeAvailabilityException.error });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = updateTimeAvailabilityExceptionHandler;
