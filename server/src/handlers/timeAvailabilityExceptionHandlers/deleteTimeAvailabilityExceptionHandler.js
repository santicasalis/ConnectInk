const deleteTimeAvailabilityException = require("../../controllers/timeAvailabilityExceptionControllers/deleteTimeAvailabilityException");

const deleteTimeAvailabilityExceptionHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTimeAvailabilityException =
      await deleteTimeAvailabilityException(id);
    res.status(200).json(deletedTimeAvailabilityException);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = deleteTimeAvailabilityExceptionHandler;
