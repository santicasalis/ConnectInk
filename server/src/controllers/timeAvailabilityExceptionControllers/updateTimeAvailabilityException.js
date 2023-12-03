const { TimeAvailabilityException } = require("../../db");

const updateTimeAvailabilityException = async (id, initialHour, finalHour) => {
  const timeAvailabilityExceptionFound =
    await TimeAvailabilityException.findByPk(id);

  if (timeAvailabilityExceptionFound) {
    await TimeAvailabilityException.update(
      {
        initialHour: initialHour,
        finalHour: finalHour,
      },
      {
        where: { id: id },
      }
    );
    return "Time availability exception update sucessfully";
  } else {
    return "Time availability exception not found";
  }
};

module.exports = updateTimeAvailabilityException;
