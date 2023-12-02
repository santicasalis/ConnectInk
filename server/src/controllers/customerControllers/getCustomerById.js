const { Customer, CustomerTattooArtistAppointment, Appointment } = require('../../db')

const getCustomerById = async (id) => {
    const customer = await Customer.findByPk(id)
    const appointmentsByArtist = await CustomerTattooArtistAppointment.findAll({
        where: { CustomerId: id },
        include: [
            {
                model: Appointment,
            },
        ],
    });
    return {
        tokenId: customer.tokenId,
        fullName: customer.fullName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        image: customer.image,
        appointments: appointmentsByArtist?.map(appointment => appointment.Appointment)

    }
}
module.exports = getCustomerById