const { TattooArtist, TimeAvailability } = require("../../db");

const createTimeAvailability = async (
  tattooArtistId,
  day,
  initialHour,
  finalHour
) => {
  const tattooArtist = await TattooArtist.findByPk(tattooArtistId);
  if (!tattooArtist) {
    throw new Error("Tattoo artist not found");
  }
  const timeAvailability = await TimeAvailability.create({
    day,
    initialHour,
    finalHour,
  });

  tattooArtist.addTimeAvailability(timeAvailability);
  return "Saved time availability";
};

module.exports = createTimeAvailability;
