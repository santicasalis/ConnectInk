const deleteTimeAvailability = require("../../controllers/timeAvailabilityControllers/deleteTimeAvailability");

const deleteTimeAvailabilityHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTimeAvailability = await deleteTimeAvailability(id);
    res.status(200).json(deletedTimeAvailability);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = deleteTimeAvailabilityHandler;
