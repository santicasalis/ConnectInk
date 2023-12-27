const { Customer, Appointment, Review } = require('../../db')

const getCustomerById = async (id) => {
  const customer = await Customer.findByPk(id, {
    include: [
      {
        model: Appointment,
        as: "appointments",
        foreignKey: "Customer_Appointment",
        attributes: ["id", "size", "image", "bodyPlace", "description", "dateAndTime", "duration", "depositPrice", "paymentId", "TattooArtist_Appointment"],
        where: { disabled: false },
        required: false
      },
      {
        model: Review,
        as: "reviews",
        foreignKey: "Customer_Review",
        attributes: ["id", "comment", "rating", "TattooArtist_Review", "Appointment_Review"],
        where: { disabled: false },
        required: false
      }
    ]
  })

  return {
    tokenId: customer.tokenId,
    fullName: customer.fullName,
    lastName: customer.lastName,
    email: customer.email,
    phone: customer.phone,
    image: customer.image,
    appointments: customer.appointments?.map((appointment) => {
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
        tattooArtistId: appointment.TattooArtist_Appointment
      }
    }),
    reviews: customer.reviews?.map((review) => {
      return {
        comment: review.comment,
        image: review.image,
        rating: review.rating,
        tattooArtistId: review.TattooArtist_Review,
        appointmentId: review.Appointment_Review
      }
    })
  }
}
module.exports = getCustomerById