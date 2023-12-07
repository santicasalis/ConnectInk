const { TimeAvailability } = require("../../db");

const updateTimeAvailability = async ({ id, initialHour, finalHour, secondInitialHour, secondFinalHour }) => {
  const timeAvailabilityFound = await TimeAvailability.findByPk(id);

  console.log(timeAvailabilityFound)

  if (timeAvailabilityFound) {
    if (initialHour > finalHour) {
      return {
        code: 404,
        error: "The initial hour must be less than the final hour",
      };
    }
    await TimeAvailability.update(
      {
        initialHour: initialHour,
        finalHour: finalHour,
        secondInitialHour: secondInitialHour,
        secondFinalHour: secondFinalHour
      },
      {
        where: { id: id },
      }
    );
    await TimeAvailability.findByPk(id);
    return {
      code: 201,
      message: "Time availability update sucessfully",
      data: timeAvailabilityFound,
    };
  } else {
    return "Time availability not found";
  }
};

module.exports = updateTimeAvailability;
