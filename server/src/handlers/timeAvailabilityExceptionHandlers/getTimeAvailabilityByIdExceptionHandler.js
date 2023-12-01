const getTimeAvailabilityExceptionById = require("../../controllers/timeAvailabilityExceptionControllers/getTimeAvailabilityExceptionById");

const getTimeAvailabilityExceptionByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const timeAvailabilityException = await getTimeAvailabilityExceptionById(
      id
    );
    if (timeAvailabilityException) {
      return res.status(200).json(timeAvailabilityException);
    } else {
      res
        .status(404)
        .json({ message: "Time Availability Exception not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = getTimeAvailabilityExceptionByIdHandler;
