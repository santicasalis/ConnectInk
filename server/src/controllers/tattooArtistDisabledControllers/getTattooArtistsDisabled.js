const {
    TattooArtist,
    TattooStyle,
    Publication,
    Review,
  } = require("../../db");
  
  const getTattooArtistsDisabled = async () => {
    const allTattooArtistsDisabled = await TattooArtist.findAll({ where: { disabled: true },});

    const tattooArtistCleaner = allTattooArtistsDisabled.map((tattooArtist) => ({
      id: tattooArtist.id,
      fullName: tattooArtist.fullName,
      email: tattooArtist.email,
      phone: tattooArtist.phone,
      instagram: tattooArtist.instagram,
      description: tattooArtist.description,
      location: tattooArtist.location,
      address: tattooArtist.address,
      shopName: tattooArtist.shopName,
      image: tattooArtist.image,
      disabled: tattooArtist.disabled,
    }));
  
    return tattooArtistCleaner;
  };
  
  module.exports = getTattooArtistsDisabled;
  