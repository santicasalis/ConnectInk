const getTimeAvailabilityException = require("../../controllers/timeAvailabilityExceptionControllers/getTimeAvailabilityException");

const getTimeAvailabilityExceptionHandler = async (req, res) => {
  try {
    const timeAvailabilityExceptions = await getTimeAvailabilityException();
    if (timeAvailabilityExceptions.length > 0) {
      return res.status(200).json(timeAvailabilityExceptions);
    } else {
      res
        .status(404)
        .json({ message: "Time Availability Exception not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getTimeAvailabilityExceptionHandler;
