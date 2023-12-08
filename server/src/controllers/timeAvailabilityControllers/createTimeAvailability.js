const { TattooArtist, TimeAvailability } = require("../../db");

const createTimeAvailability = async (
  {tattooArtistId,
  day,
  initialHour,
  finalHour,
  secondInitialHour,
  secondFinalHour}
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

  

  if (Number(initialHour.split(":")[0]) > Number(finalHour.split(":")[0])) {
    console.log(initialHour.split(":")[0], finalHour.split(":")[0])
    return {
      code: 404,
      error: "The initial hour must be less than the final hour",
    };
  }

  if(secondInitialHour && secondFinalHour){
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
