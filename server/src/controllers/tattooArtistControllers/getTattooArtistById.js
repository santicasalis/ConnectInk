const { TattooArtist } = require("../../db");

const getTattooArtistById = async (id) => {
  const tattooArtist = await TattooArtist.findByPk(
    id /* {
    include: [{ model: TattooStyle, attributes: ["name"] }],
  }*/
  );
  return {
    id: tattooArtist.id,
    name: tattooArtist.name,
    lastName: tattooArtist.lastName,
    email: tattooArtist.email,
    phone: tattooArtist.phone,
    location: tattooArtist.location,
    shopName: tattooArtist.shopName,
    /*tattooStyle: tattooArtist.tattooStyles
      .map((tattooStyle) => tattooStyle.name)
      .join(", "),*/
  };
};

module.exports = getTattooArtistById;
