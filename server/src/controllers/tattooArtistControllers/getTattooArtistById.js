const { TattooArtist, TattooStyle } = require("../../db");

const getTattooArtistById = async (id) => {
  const tattooArtist = await TattooArtist.findByPk(id, {
    include: [{ model: TattooStyle, attributes: ["name"] }],
  });
  return {
    id: tattooArtist.id,
    name: tattooArtist.name,
    lastName: tattooArtist.lastName,
    email: tattooArtist.email,
    phone: tattooArtist.phone,
    location: tattooArtist.location,
    address: tattooArtist.address,
    shopName: tattooArtist.shopName,
    disabled: tattooArtist.disabled,
    tattooStyles: tattooArtist?.TattooStyles.map(
      (tattooStyle) => tattooStyle.name
    ),
  };
};

module.exports = getTattooArtistById;
