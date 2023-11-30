const getTimeAvailability = require("../../controllers/timeAvailabilityControllers/getTimeAvailability");

const getTimeAvailabilityHandler = async (req, res) => {
  try {
    const timeAvailabilities = await getTimeAvailability();
    if (timeAvailabilities.length > 0) {
      return res.status(200).json(timeAvailabilities);
    } else {
      res.status(404).json({ message: "Time Availability not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getTimeAvailabilityHandler;
