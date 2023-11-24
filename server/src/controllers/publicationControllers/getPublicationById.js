const { Publication } = require("../../db");

const getPublicationById = async (id) => {
  const publication = await Publication.findByPk(id);

  return publication;
};

module.exports = getPublicationById;
