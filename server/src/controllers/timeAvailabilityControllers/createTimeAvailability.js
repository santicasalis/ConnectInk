const { TattooArtist, TimeAvailability } = require("../../db");

const createTimeAvailability = async (
  tattooArtistId,
  day,
  initialHour,
  finalHour,
  secondInitialHour,
  secondFinalHour
) => {
  const tattooArtist = await TattooArtist.findByPk(tattooArtistId);
  if (!tattooArtist) {
    return { code: 404, error: "Tattoo artist not found" };
  }

  const timeAvailabilityExist =
    await TimeAvailability.findOne({
      where: { TattooArtistId: tattooArtistId, day: day },
    });
  if (timeAvailabilityExist) {
    return {
      code: 404,
      error: "A time availability for that day already exists",
    };
  }

  if (initialHour > finalHour) {
    return {
      code: 404,
      error: "The initial hour must be less than the final hour",
    };
  }

  if (secondInitialHour > secondFinalHour) {
    return {
      code: 404,
      error: "The second initial hour must be less than the second final hour",
    };
  }

  if (finalHour > secondInitialHour) {
    return {
      code: 404,
      error: "The second initial hour must be more than the final hour",
    };
  }

  try {
    const timeAvailability = await TimeAvailability.create({
      day,
      initialHour,
      finalHour,
      secondInitialHour,
      secondFinalHour
    });
    tattooArtist.addTimeAvailability(timeAvailability);
    return {
      code: 201,
      message: "Time Availability created successfully",
      data: timeAvailability,
    };
  } catch (error) {
    return { code: 400, error: "Something went wrong" };
  }
};

module.exports = createTimeAvailability;
