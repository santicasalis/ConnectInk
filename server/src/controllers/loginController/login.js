const {
  TattooArtist,
  TattooStyle,
  Publication,
  TimeAvailability,
  TimeAvailabilityException,
  PriceRange,
  Customer,
  Admin,
  Appointment,
  Review,
} = require("../../db");
const { Op } = require("sequelize");

const login = async (tokenId) => {
  let user = {};
  let cleanUser = {};
  user = await TattooArtist.findOne({
    where: { tokenId: tokenId },
    include: [
      { model: TattooStyle, attributes: ["name"] },
      {
        model: Publication,
        attributes: [
          "id",
          "description",
          "image",
          "createdAt",
          "updatedAt",
          "disabled",
        ],
        required: false,
        where: { disabled: false },
      },
      {
        model: TimeAvailability,
        attributes: [
          "id",
          "day",
          "initialHour",
          "finalHour",
          "secondInitialHour",
          "secondFinalHour",
        ],
        required: false,
      },
      {
        model: TimeAvailabilityException,
        attributes: [
          "id",
          "date",
          "initialHour",
          "finalHour",
          "secondInitialHour",
          "secondFinalHour",
        ],
        required: false,
      },
      {
        model: PriceRange,
        attributes: ["size", "priceMin", "priceMax", "id"],
      },
      {
        model: Appointment,
        as: "appointments",
        foreignKey: "TattooArtist_Appointment",
        attributes: [
          "id",
          "size",
          "image",
          "bodyPlace",
          "description",
          "dateAndTime",
          "duration",
          "depositPrice",
          "paymentId",
          "paymentStatus",
          "Customer_Appointment",
        ],
        where: {
          disabled: false,
          [Op.or]: [
            { paymentStatus: "approved" },
            { paymentStatus: "in_process" },
          ],
        },
        required: false,
      },
      {
        model: Review,
        as: "reviews",
        foreignKey: "TattooArtist_Review",
        attributes: [
          "id",
          "comment",
          "rating",
          "Customer_Review",
          "Appointment_Review",
        ],
        where: { disabled: false },
        required: false,
      },
    ],
  });

  if (user) {
    if (user.disabled) {
      throw Error("Cuenta baneada");
    }
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
          disabled: publication.disabled,
        };
      }),
      timeAvailabilities: user.TimeAvailabilities?.map((timeAvailability) => {
        return {
          id: timeAvailability.id,
          day: timeAvailability.day,
          initialHour: timeAvailability.initialHour,
          finalHour: timeAvailability.finalHour,
          secondInitialHour: timeAvailability.secondInitialHour,
          secondFinalHour: timeAvailability.secondFinalHour,
        };
      }),
      timeAvailabilityExceptions: user.TimeAvailabilityExceptions?.map(
        (timeAvailabilityException) => {
          return {
            id: timeAvailabilityException.id,
            date: timeAvailabilityException.date,
            initialHour: timeAvailabilityException.initialHour,
            finalHour: timeAvailabilityException.finalHour,
            secondInitialHour: timeAvailabilityException.secondInitialHour,
            secondFinalHour: timeAvailabilityException.secondFinalHour,
          };
        }
      ),
      priceRanges: user.PriceRanges?.map((priceRange) => {
        return {
          size: priceRange.size,
          priceMin: priceRange.priceMin,
          priceMax: priceRange.priceMax,
          id: priceRange.id,
        };
      }),
      appointments: user.appointments?.map((appointment) => {
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
          paymentStatus: appointment.paymentStatus,
          CustomerId: appointment.Customer_Appointment,
        };
      }),
      reviews: user.reviews?.map((review) => {
        return {
          comment: review.comment,
          image: review.image,
          rating: review.rating,
          customerId: review.Customer_Review,
          appointmentId: review.Appointment_Review,
        };
      }),
    };
  }

  if (!user) {
    let userCustomer = await Customer.findOne({
      where: { tokenId: tokenId, disabled: false },
      include: [
        {
          model: Appointment,
          as: "appointments",
          foreignKey: "Customer_Appointment",
          attributes: [
            "id",
            "size",
            "image",
            "bodyPlace",
            "description",
            "dateAndTime",
            "duration",
            "depositPrice",
            "paymentId",
            "TattooArtist_Appointment",
            "paymentStatus",
          ],
          where: {
            disabled: false,
            [Op.or]: [
              { paymentStatus: "approved" },
              { paymentStatus: "in_process" },
              { paymentStatus: "rejected" },
            ],
          },
          required: false,
        },
        {
          model: Review,
          as: "reviews",
          foreignKey: "Customer_Review",
          attributes: [
            "id",
            "comment",
            "rating",
            "TattooArtist_Review",
            "Appointment_Review",
          ],
          where: { disabled: false },
          required: false,
        },
      ],
    });

    if (userCustomer) {
      if (userCustomer.disabled) {
        throw Error("Cuenta baneada");
      }
      cleanUser = {
        id: userCustomer.id,
        fullName: userCustomer.fullName,
        email: userCustomer.email,
        phone: userCustomer.phone,
        image: userCustomer.image,
        disabled: userCustomer.disabled,
        userType: userCustomer.userType,
        appointments: userCustomer.appointments?.map((appointment) => {
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
            tattooArtistId: appointment.TattooArtist_Appointment,
            paymentStatus: appointment.paymentStatus,
          };
        }),
        reviews: userCustomer.reviews?.map((review) => {
          return {
            comment: review.comment,
            image: review.image,
            rating: review.rating,
            tattooArtistId: review.TattooArtist_Review,
            appointmentId: review.Appointment_Review,
          };
        }),
      };
    }
    if (!userCustomer) {
      let userAdmin = await Admin.findOne({ where: { tokenId: tokenId } });
      if (userAdmin) {
        cleanUser = {
          id: userAdmin.id,
          userType: userAdmin.userType,
          disabled: userAdmin.disabled,
          fullName: userAdmin.fullName,
          email: userAdmin.email,
        };
      }
    }
  }

  return cleanUser;
};

module.exports = login;
