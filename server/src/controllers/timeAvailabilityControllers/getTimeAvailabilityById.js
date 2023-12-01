const { TimeAvailability } = require("../../db");

const getTimeAvailabilityById = async (id) => {
  const timeAvailability = await TimeAvailability.findAll({where: {TattooArtistId: id}});

  return timeAvailability;
};

module.exports = getTimeAvailabilityById;
