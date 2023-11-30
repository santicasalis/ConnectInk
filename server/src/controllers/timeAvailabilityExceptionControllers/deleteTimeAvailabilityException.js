const { TimeAvailabilityException } = require("../../db");

const deleteTimeAvailabilityException = async (id) => {
  await TimeAvailabilityException.destroy({ where: { id } });

  return "Time availability exception deleted successfully";
};

module.exports = deleteTimeAvailabilityException;
