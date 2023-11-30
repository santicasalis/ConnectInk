const { TimeAvailabilityException } = require("../../db");

async function getTimeAvailabilityException() {
  const timeAvailabilityException = TimeAvailabilityException.findAll();

  return timeAvailabilityException;
}

module.exports = getTimeAvailabilityException;
