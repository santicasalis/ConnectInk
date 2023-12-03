const { TimeAvailabilityException } = require("../../db");

const getTimeAvailabilityExceptionById = async (id) => {
  const timeAvailabilityException = await TimeAvailabilityException.findByPk(
    id
  );

  return timeAvailabilityException;
};

module.exports = getTimeAvailabilityExceptionById;
