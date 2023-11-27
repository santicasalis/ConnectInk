const { TattooArtist, TimeAvailability } = require("../../db");

const createTimeAvailability = async (artistId, date, initialHour, finalHour) => {
  const timeAvailability = await TimeAvailability.create({
    date,
    initialHour,
    finalHour,
  });

  const tattooArtist = await TattooArtist.findByPk(artistId);
  tattooArtist.setTimeAvailability(timeAvailability);

  return "saved time availability";
};

module.exports = createTimeAvailability;
