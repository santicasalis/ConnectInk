const { TattooArtist, TimeAvailabilityException } = require("../../db");

const createTimeAvailabilityException = async (
  tattooArtistId,
  date,
  initialHour,
  finalHour,
  secondInitialHour,
  secondFinalHour
) => {
  const tattooArtist = await TattooArtist.findByPk(tattooArtistId);
  if (!tattooArtist) {
    throw new Error("Tattoo artist not found");
  }

  const timeAvailabilityExceptionExist =
    await TimeAvailabilityException.findOne({
      where: { TattooArtistId: tattooArtistId, date: date },
    });
  if (timeAvailabilityExceptionExist) {
    return {
      code: 404,
      error: "A time availability exception for that date already exists",
    };
  }

  if (Number(initialHour.split(":")[0]) > Number(finalHour.split(":")[0])) {
    return {
      code: 404,
      error: "The initial hour must be less than the final hour",
    };
  }
  if (Number(secondInitialHour.split(":")[0]) > Number(secondFinalHour.split(":")[0])) {
    return {
      code: 404,
      error: "The second initial hour must be less than the second final hour",
    };
  }

  if (Number(finalHour.split(":")[0]) > Number(secondInitialHour.split(":")[0])) {
    return {
      code: 404,
      error: "The second initial hour must be more than the final hour",
    };
  }

  const timeAvailabilityException = await TimeAvailabilityException.create({
    date,
    initialHour,
    finalHour,
    secondInitialHour,
    secondFinalHour
  });

  tattooArtist.addTimeAvailabilityException(timeAvailabilityException);

  return {
    code: 201,
    message: "Saved time availability exception",
    data: timeAvailabilityException,
  };
};

module.exports = createTimeAvailabilityException;
