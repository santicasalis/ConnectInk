const { TattooStyle } = require("../../db");

const createTattoStyle = async (name) => {
  const newTattooStyle = await TattooStyle.create({ name });
  return newTattooStyle;
};

module.exports = createTattoStyle;
