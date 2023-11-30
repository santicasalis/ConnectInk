const getTimeAvailabilityById = require("../../controllers/timeAvailabilityControllers/getTimeAvailabilityExceptionById");

const getTimeAvailabilityByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const timeAvailability = await getTimeAvailabilityById(id);
    if (timeAvailability) {
      return res.status(200).json(timeAvailability);
    } else {
      res
        .status(404)
        .json({ message: "Time Availability Exception not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = getTimeAvailabilityByIdHandler;
