const updateTimeAvailability = require("../../controllers/timeAvailabilityControllers/updateTimeAvailabilityException");

const updateTimeAvailabilityHandler = async (req, res) => {
  const { id } = req.params;
  const { date, initialHour, finalHour } = req.body;

  try {
    const result = await updateTimeAvailability(
      id,
      date,
      initialHour,
      finalHour
    );

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = updateTimeAvailabilityHandler;
