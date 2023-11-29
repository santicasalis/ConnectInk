const { TattooArtist, TattooStyle, Publication, TimeAvailability } = require("../../db");

const getTattooArtists = async () => {
  const allTattooArtists = await TattooArtist.findAll({
    where: { disabled: false },
    include: [
      { model: TattooStyle, attributes: ["name"] },
      { model: Publication, attributes: ["description", "image", "createdAt", "updatedAt"] },
      { model: TimeAvailability, attributes: ["date", "initialHour", "finalHour"] }
    ],
  });
  const tattooArtistCleaner = allTattooArtists.map((tattooArtist) => ({
    id: tattooArtist.id,
    name: tattooArtist.name,
    lastName: tattooArtist.lastName,
    email: tattooArtist.email,
    phone: tattooArtist.phone,
    instagram: tattooArtist.instagram,
    description: tattooArtist.description,
    location: tattooArtist.location,
    address: tattooArtist.address,
    shopName: tattooArtist.shopName,
    image: tattooArtist.image,
    disabled: tattooArtist.disabled,
    tattooStyles: tattooArtist.TattooStyles?.map(
      (tattooStyle) => tattooStyle.name
    ),
    publications: tattooArtist.Publications?.map((publication) => {
      return {
        description: publication.description,
        image: publication.image,
        createdAt: publication.createdAt,
        updatedAt: publication.updatedAt
      };
    }),
    timeAvailabilities: tattooArtist.TimeAvailabilities?.map((timeAvailability) => {
      return {
        date: timeAvailability.date,
        initialHour: timeAvailability.initialHour,
        finalHour: timeAvailability.finalHour
      }
    })
  }));


  return tattooArtistCleaner;
};

module.exports = getTattooArtists;
