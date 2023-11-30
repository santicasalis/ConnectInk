const { TimeAvailability } = require("../../db");

const getTimeAvailability = async () => {
  const timeAvailability = TimeAvailability.findAll();

  return timeAvailability;
};

module.exports = getTimeAvailability;
