const { TattooArtist, TattooStyle, Publication, TimeAvailability, TimeAvailabilityException, PriceRange } = require("../../db");

const login = async (tokenId) => {
  const user = await TattooArtist.findOne({
    where: {tokenId}, 
    include: [
      { model: TattooStyle, attributes: ["name"] },
      {
        model: Publication,
        attributes: ["description", "image", "createdAt", "updatedAt"],
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
        attributes: ["size", "priceMin", "priceMax"]
      }
    ]
  });

  const cleanUser = {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    instagram: user.instagram,
    description: user.description,
    location: user.location,
    address: user.address,
    shopName: user.shopName,
    image: user.image,
    disabled: user.disabled,
    tattooStyles: user.TattooStyles?.map(
      (tattooStyle) => tattooStyle.name
    ),
    publications: user.Publications?.map((publication) => {
      return {
        description: publication.description,
        image: publication.image,
        createdAt: publication.createdAt,
        updatedAt: publication.updatedAt,
      };
    }),
    timeAvailabilities: user.TimeAvailabilities?.map(
      (timeAvailability) => {
        return {
          day: timeAvailability.day,
          initialHour: timeAvailability.initialHour,
          finalHour: timeAvailability.finalHour,
        };
      }
    ),
    timeAvailabilityExceptions: user.TimeAvailabilityExceptions?.map(
      (timeAvailabilityException) => {
        return {
          date: timeAvailabilityException.date,
          initialHour: timeAvailabilityException.initialHour,
          finalHour: timeAvailabilityException.finalHour,
        };
      }
    ),
    priceRanges: user.PriceRanges?.map(
      (priceRange) => {
        return {
          size: priceRange.size,
          priceMin: priceRange.priceMin,
          priceMax: priceRange.priceMax
        }

      }
    )
  }

  return cleanUser;
};

module.exports = login;
