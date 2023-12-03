const { TimeAvailability } = require("../../db");

const updateTimeAvailability = async (id, initialHour, finalHour) => {
  const timeAvailabilityFound = await TimeAvailability.findByPk(id);

  if (timeAvailabilityFound) {
    await TimeAvailability.update(
      {
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
