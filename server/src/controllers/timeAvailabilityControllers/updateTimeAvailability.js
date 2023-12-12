const { TimeAvailability } = require("../../db");

const updateTimeAvailability = async ({
  id,
  initialHour,
  finalHour,
  secondInitialHour,
  secondFinalHour,
}) => {
  const timeAvailabilityFound = await TimeAvailability.findByPk(id);

  if (!timeAvailabilityFound) {
    return "Time availability not found";
  } else {
    if (secondInitialHour === null) {
      if (Number(initialHour.split(":")[0]) > Number(finalHour.split(":")[0])) {
        console.log(initialHour.split(":")[0], finalHour.split(":")[0]);
        return {
          code: 404,
          error: "1 The initial hour must be less than the final hour",
        };
      }
    }
    if (secondInitialHour && secondFinalHour) {
      if (
        Number(secondInitialHour.split(":")[0]) >
        Number(secondFinalHour.split(":")[0])
      ) {
        return {
          code: 404,
          error:
            "2 The second initial hour must be less than the second final hour",
        };
      }

      if (
        Number(finalHour.split(":")[0]) >
        Number(secondInitialHour.split(":")[0])
      ) {
        return {
          code: 404,
          error: "3 The second initial hour must be more than the final hour",
        };
      }
    }
  }

  try {
    const timeAvailabilityUpdated = await TimeAvailability.update(
      {
        initialHour: initialHour,
        finalHour: finalHour,
        secondInitialHour: secondInitialHour,
        secondFinalHour: secondFinalHour,
      },
      {
        where: { id: id },
      }
    );
    return {
      code: 201,
      message: "Time availability update sucessfully",
      data: timeAvailabilityUpdated,
    };
  } catch (error) {
    console.log(error);
    return { code: 400, error: "Something went wrong" };
  }
};

module.exports = updateTimeAvailability;
