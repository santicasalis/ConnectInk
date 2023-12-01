const { TimeAvailabilityException } = require("../../db");

const getTimeAvailabilityExceptionById = async (id) => {
  const timeAvailabilityException = await TimeAvailabilityException.findAll({where: {TattooArtistId: id}}
  );

  return timeAvailabilityException;
};

module.exports = getTimeAvailabilityExceptionById;
