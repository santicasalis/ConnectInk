const {
  TattooArtist,
  TattooStyle,
  Publication,
  TimeAvailability,
  TimeAvailabilityException,
  PriceRange
} = require("../../db");

const getTattooArtists = async () => {
  const allTattooArtists = await TattooArtist.findAll({
    where: { disabled: false },
    include: [
      { model: TattooStyle, attributes: ["name"] },
      {
        model: Publication,
        attributes: ["id","description", "image", "createdAt", "updatedAt"],
        where: { disabled: false },
      },
      {
        model: TimeAvailability,
        attributes: ["day", "initialHour", "finalHour"],
      },
      {
        model: TimeAvailabilityException,
        attributes: ["date", "initialHour", "finalHour"],
      },
      {
        model: PriceRange,
        attributes: ["size", "priceMin", "priceMax"],
      },
    ],
  });
  const tattooArtistCleaner = allTattooArtists.map((tattooArtist) => ({
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
    tattooStyles: tattooArtist.TattooStyles?.map(
      (tattooStyle) => tattooStyle.name
    ),
    publications: tattooArtist.Publications?.filter((publication) => !publication.disabled).map((publication) => {
      return {
        id: publication.id,
        description: publication.description,
        image: publication.image,
        createdAt: publication.createdAt,
        updatedAt: publication.updatedAt,
      };
    }),
    timeAvailabilities: tattooArtist.TimeAvailabilities?.map(
      (timeAvailability) => {
        return {
          day: timeAvailability.day,
          initialHour: timeAvailability.initialHour,
          finalHour: timeAvailability.finalHour,
        };
      }
    ),
    timeAvailabilityExceptions: tattooArtist.TimeAvailabilityExceptions?.map(
      (timeAvailabilityException) => {
        return {
          date: timeAvailabilityException.date,
          initialHour: timeAvailabilityException.initialHour,
          finalHour: timeAvailabilityException.finalHour,
        };
      }
    ),
    priceRanges: tattooArtist.PriceRanges?.map(
      (priceRange) => {
        return {
          size: priceRange.size,
          priceMin: priceRange.priceMin,
          priceMax: priceRange.priceMax
        }

      }
    )
  }));

  return tattooArtistCleaner;
};

module.exports = getTattooArtists;
