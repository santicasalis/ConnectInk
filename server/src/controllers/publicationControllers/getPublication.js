const { Publication } = require("../../db");

async function getPublicationController() {
  const publications = Publication.findAll({ where: { disabled: false } });

  return publications;
}

module.exports = getPublicationController;
