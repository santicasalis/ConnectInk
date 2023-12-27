const { TimeAvailabilityException } = require("../../db");

const updateTimeAvailabilityException = async ({id, initialHour, finalHour, secondInitialHour, secondFinalHour}) => {
  const timeAvailabilityExceptionFound =
    await TimeAvailabilityException.findByPk(id);

  if (timeAvailabilityExceptionFound) {
    if (initialHour > finalHour) {
      return {
        code: 404,
        error: "The initial hour must be less than the final hour",
      };
    }
    await TimeAvailabilityException.update(
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
    return {
      code: 201,
      message: "Time availability exception update sucessfully",
      data: timeAvailabilityExceptionFound,
    };
  } else {
    return "Time availability exception not found";
  }
};

module.exports = updateTimeAvailabilityException;
