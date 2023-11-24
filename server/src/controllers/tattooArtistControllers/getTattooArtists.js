const { TattooArtist, TattooStyle } = require("../../db");

const getTattooArtists = async () => {
  const allTattooArtists = await TattooArtist.findAll({
    where: { disabled: false },
    include: [{ model: TattooStyle, attributes: ["name"] }],
  });
  const tattooArtistCleaner = allTattooArtists.map((tattooArtist) => ({
    id: tattooArtist.id,
    name: tattooArtist.name,
    lastName: tattooArtist.lastName,
    email: tattooArtist.email,
    phone: tattooArtist.phone,
    location: tattooArtist.location,
    address: tattooArtist.address,
    shopName: tattooArtist.shopName,
    disabled: tattooArtist.disabled,
    tattooStyles: tattooArtist.TattooStyles?.map(
      (tattooStyle) => tattooStyle.name
    ),
  }));
  return tattooArtistCleaner;
};

module.exports = getTattooArtists;
