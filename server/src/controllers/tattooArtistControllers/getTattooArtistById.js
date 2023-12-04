const {
  TattooArtist,
  TattooStyle,
  Publication,
  TimeAvailability,
  TimeAvailabilityException,
  PriceRange,
  CustomerTattooArtistAppointment,
  Appointment,
} = require("../../db");

const getTattooArtistById = async (id) => {
  const tattooArtist = await TattooArtist.findByPk(id, {
    include: [
      { model: TattooStyle, attributes: ["name"] },
      {
        model: Publication,
        attributes: ["id", "description", "image", "createdAt", "updatedAt"],
        where: { disabled: false },
      },
      {
        model: TimeAvailability,
        attributes: ["id", "day", "initialHour", "finalHour"],
      },
      {
        model: TimeAvailabilityException,
        attributes: ["id", "date", "initialHour", "finalHour"],
      },
      {
        model: PriceRange,
        attributes: ["id", "size", "priceMin", "priceMax"],
      },
    ],
  });
  const appointmentsByArtist = await CustomerTattooArtistAppointment.findAll({
    where: { TattooArtistId: id },
    include: [
      {
        model: Appointment,
      },
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
    appointments: appointmentsByArtist?.map(
      (appointment) => appointment.Appointment
    ),
  };
};

module.exports = getTattooArtistById;
