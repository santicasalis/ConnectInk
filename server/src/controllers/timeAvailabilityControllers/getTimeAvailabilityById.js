const { TimeAvailability } = require("../../db");

const getTimeAvailabilityById = async (id) => {
  const timeAvailability = await TimeAvailability.findByPk(id);

  return timeAvailability;
};

module.exports = getTimeAvailabilityById;
