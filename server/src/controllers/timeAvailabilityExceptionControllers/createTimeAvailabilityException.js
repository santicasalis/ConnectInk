const { TattooArtist, TimeAvailabilityException } = require("../../db");

const createTimeAvailabilityException = async (
  tattooArtistId,
  date,
  initialHour,
  finalHour
) => {
  const tattooArtist = await TattooArtist.findByPk(tattooArtistId);
  if (!tattooArtist) {
    throw new Error("Tattoo artist not found");
  }

  const timeAvailabilityException = await TimeAvailabilityException.create({
    date,
    initialHour,
    finalHour,
  });

  tattooArtist.addTimeAvailabilityException(timeAvailabilityException);

  return "Saved time availability exception";
};

module.exports = createTimeAvailabilityException;
