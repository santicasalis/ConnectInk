const { TattooArtist, TattooStyle } = require("../../db");

const getTattooArtists = async () => {
  const allTattooArtists = await TattooArtist.findAll({
    where: { disabled: false },
  });
  /*{
    include: [{ model: TattooStyle, attributes: ["name"] }],
  }*/

  return allTattooArtists;
};

module.exports = getTattooArtists;
