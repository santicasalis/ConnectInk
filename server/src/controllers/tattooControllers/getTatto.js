const { Tattoo } = require("../../db");

const getTattoo = async () => {
  const allTattoo = await Tattoo.findAll();

  return allTattoo;
};

module.exports = getTattoo;
