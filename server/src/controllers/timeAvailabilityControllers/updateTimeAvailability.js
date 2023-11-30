const { TimeAvailability } = require("../../db");

const updateTimeAvailability = async (id, day, initialHour, finalHour) => {
  const timeAvailabilityFound = await TimeAvailability.findByPk(id);

  if (timeAvailabilityFound) {
    await TimeAvailability.update(
      {
        day: day,
        initialHour: initialHour,
        finalHour: finalHour,
      },
      {
        where: { id: id },
      }
    );
    return "Time availability update sucessfully";
  } else {
    return "Time availability not found";
  }
};

module.exports = updateTimeAvailability;
