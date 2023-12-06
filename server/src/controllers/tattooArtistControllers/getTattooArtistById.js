const {
  TattooArtist,
  TattooStyle,
  Publication,
  TimeAvailability,
  TimeAvailabilityException,
  PriceRange,
  Appointment,
  Review
} = require("../../db");

const getTattooArtistById = async (id) => {
  const tattooArtist = await TattooArtist.findByPk(id, {
    include: [
      { model: TattooStyle, attributes: ["name"], required: false },

      {
        model: Publication,
        attributes: ["id", "description", "image", "createdAt", "updatedAt"],
        where: { disabled: false },
        required: false
      },
      {
        model: TimeAvailability,
        attributes: ["id", "day", "initialHour", "finalHour"],
        required: false
      },
      {
        model: TimeAvailabilityException,
        attributes: ["id", "date", "initialHour", "finalHour"],
        required: false
      },
      {
        model: PriceRange,
        attributes: ["id", "size", "priceMin", "priceMax"],
        required: false
      },
      {
        model: Appointment,
        as: "appointments",
        foreignKey: "TattooArtist_Appointment",
        attributes: ["id", "size", "image", "bodyPlace", "description", "dateAndTime", "duration", "depositPrice", "paymentId", "Customer_Appointment"],
        where: { disabled: false },
        required: false
      },
      {
        model: Review,
        as: "reviews",
        foreignKey: "TattooArtist_Review",
        attributes: ["id", "comment", "rating", "Customer_Review", "Appointment_Review"],
        where: { disabled: false },
        required: false
      }
    ],
  });

  return {
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
    tattooStyles: tattooArtist?.TattooStyles.map(
      (tattooStyle) => tattooStyle.name
    ),
    publications: tattooArtist.Publications?.filter(
      (publication) => !publication.disabled
    ).map((publication) => {
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
          id: timeAvailability.id,
          day: timeAvailability.day,
          initialHour: timeAvailability.initialHour,
          finalHour: timeAvailability.finalHour,
        };
      }
    ),
    timeAvailabilityExceptions: tattooArtist.TimeAvailabilityExceptions?.map(
      (timeAvailabilityException) => {
        return {
          id: timeAvailabilityException.id,
          date: timeAvailabilityException.date,
          initialHour: timeAvailabilityException.initialHour,
          finalHour: timeAvailabilityException.finalHour,
        };
      }
    ),
    priceRanges: tattooArtist.PriceRanges?.map((priceRange) => {
      return {
        id: priceRange.id,
        size: priceRange.size,
        priceMin: priceRange.priceMin,
        priceMax: priceRange.priceMax,
      };
    }),
    appointments: tattooArtist.appointments?.map((appointment) => {
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
        CustomerId: appointment.Customer_Appointment
      }
    }),
    reviews: tattooArtist.reviews?.map((review) => {
      return {
        comment: review.comment,
        image: review.image,
        rating: review.rating,
        customerId: review.Customer_Review,
        appointmentId: review.Appointment_Review
      }
    })
  };
};

module.exports = getTattooArtistById;
