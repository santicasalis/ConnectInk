const getTimeAvailability = require("../../controllers/timeAvailabilityControllers/getTimeAvailabilityException");

const getTimeAvailabilityHandler = async (req, res) => {
  try {
    const timeAvailability = await getTimeAvailability();
    if (timeAvailability.length > 0) {
      return res.status(200).json(timeAvailability);
    } else {
      res.status(404).json({ message: "Time Availability not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getTimeAvailabilityHandler;
