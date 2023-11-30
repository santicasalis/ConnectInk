const { TattooArtist, TimeAvailability } = require("../../db");

const createTimeAvailability = async (artistId, date, initialHour, finalHour) => {
  
  const tattooArtist = await TattooArtist.findByPk(artistId);
  if (!tattooArtist) {
    throw new Error("Artist not found");
  }

  const timeAvailability = await TimeAvailability.create({
    date,
    initialHour,
    finalHour,
  });

  tattooArtist.addTimeAvailability(timeAvailability);

  return "saved time availability";
};

module.exports = createTimeAvailability;
