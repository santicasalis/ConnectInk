const { TattooStyle } = require("../../db");

const getTattoStyles = async () => {
  const allTattooStyles = await TattooStyle.findAll();

  return allTattooStyles;
};

module.exports = getTattoStyles;
