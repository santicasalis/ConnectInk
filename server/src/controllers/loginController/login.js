const {
  TattooArtist,
  TattooStyle,
  Publication,
  TimeAvailability,
  TimeAvailabilityException,
  PriceRange,
  Customer,
  Admin,
  Appointment
} = require("../../db");

const login = async (tokenId) => {
  let user = {};
  let cleanUser = {};
  user = await TattooArtist.findOne({
    where: { tokenId: tokenId, disabled: false },
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
      {
        model: Appointment,
        as: "appointments",
        foreignKey: "TattooArtist_Appointment",
        attributes: ["id", "size", "image", "bodyPlace", "description", "dateAndTime", "duration", "depositPrice", "paymentId", "TattooArtistId", "CustomerId"],
        where: { disabled: false },
        required: false
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
      appointments: user.Appointment?.map(appointment => {
        return {
          id: appointment.id,
          size: appointment.size,
          image: appointment.image,
          bodyPlace: appointment.bodyPlace,
          description: appointment.description,
          dateAndTime: appointment.dateAndTime,
          duration: appointment.duration,
          depositPrice: appointment.depositPrice,
          paymentId: appointment.paymentId,
          customerId: appointment.CustomerId
        }
      })
    };
  }

  if (!user) {
    let userCustomer = await Customer.findOne({
      where: { tokenId: tokenId, disabled: false},
      include: [
        {
          model: Appointment,
          as: "appointments",
          foreignKey: "Customer_Appointment",
          attributes: ["id", "size", "image", "bodyPlace", "description", "dateAndTime", "duration", "depositPrice", "paymentId", "TattooArtistId", "CustomerId"],
          where: { disabled: false },
          required: false
        },
      ]
    });

    cleanUser = {
      id: userCustomer.id,
      fullName: userCustomer.fullName,
      email: userCustomer.email,
      phone: userCustomer.phone,
      image: userCustomer.image,
      disabled: userCustomer.disabled,
      userType: userCustomer.userType,
      appointments: userCustomer.Appointment?.map(appointment => {
        return {
          id: appointment.id,
          size: appointment.size,
          image: appointment.image,
          bodyPlace: appointment.bodyPlace,
          description: appointment.description,
          dateAndTime: appointment.dateAndTime,
          duration: appointment.duration,
          depositPrice: appointment.depositPrice,
          paymentId: appointment.paymentId,
          tattooArtistId: appointment.TattooArtistId
        }
      })
    };
  }

  return cleanUser;
};

module.exports = login;
