const {
  TattooArtist,
  TattooStyle,
  Publication,
  TimeAvailability,
  TimeAvailabilityException,
  PriceRange,
  Customer,
  Admin,
} = require("../../db");

const login = async (tokenId) => {
  let user = {};
  let cleanUser = {};
  user = await TattooArtist.findOne({
    where: { tokenId: tokenId },
    include: [
      { model: TattooStyle, attributes: ["name"] },
      {
        model: Publication,
        attributes: ["id", "description", "image", "createdAt", "updatedAt"],
      },
      {
        model: TimeAvailability,
        attributes: ["id", "day", "initialHour", "finalHour"],
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

  if (user) {
    cleanUser = {
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
      userType: user.userType,
      tattooStyles: user.TattooStyles?.map((tattooStyle) => tattooStyle.name),
      publications: user.Publications?.map((publication) => {
        return {
          id: publication.id,
          description: publication.description,
          image: publication.image,
          createdAt: publication.createdAt,
          updatedAt: publication.updatedAt,
        };
      }),
      timeAvailabilities: user.TimeAvailabilities?.map((timeAvailability) => {
        return {
          id: timeAvailability.id,
          day: timeAvailability.day,
          initialHour: timeAvailability.initialHour,
          finalHour: timeAvailability.finalHour,
        };
      }),
      timeAvailabilityExceptions: user.TimeAvailabilityExceptions?.map(
        (timeAvailabilityException) => {
          return {
            date: timeAvailabilityException.date,
            initialHour: timeAvailabilityException.initialHour,
            finalHour: timeAvailabilityException.finalHour,
          };
        }
      ),
      priceRanges: user.PriceRanges?.map((priceRange) => {
        return {
          size: priceRange.size,
          priceMin: priceRange.priceMin,
          priceMax: priceRange.priceMax,
        };
      }),
    };
  }

  if (!user) {
    let userCustomer = await Customer.findOne({
      where: { tokenId: tokenId },
    });

    cleanUser = {
      id: userCustomer.id,
      fullName: userCustomer.fullName,
      email: userCustomer.email,
      phone: userCustomer.phone,
      image: userCustomer.image,
      disabled: userCustomer.disabled,
      userType: userCustomer.userType,
    };
  }

  return cleanUser;
};

module.exports = login;
