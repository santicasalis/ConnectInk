const { TimeAvailability } = require("../../db");

const deleteTimeAvailability = async (id) => {
  await TimeAvailability.destroy({ where: { id } });

  return "deleted with success";
};

module.exports = deleteTimeAvailability;
