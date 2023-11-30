const updateTimeAvailability = require("../../controllers/timeAvailabilityControllers/updateTimeAvailability");

const updateTimeAvailabilityHandler = async (req, res) => {
  const { id } = req.params;
  const { day, initialHour, finalHour } = req.body;

  try {
    const updatedTimeAvailability = await updateTimeAvailability(
      id,
      day,
      initialHour,
      finalHour
    );
    res.status(200).json(updatedTimeAvailability);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = updateTimeAvailabilityHandler;
