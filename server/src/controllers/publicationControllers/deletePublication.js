const { Publication } = require("../../db");

const deletePublication = async (id) => {
  await Publication.destroy({ where: { id } });

  return "deleted with success";
};

module.exports = deletePublication;
