const {Appointment} = require("../../db")

async function getAppointmentController(){
    const Appointments = Appointment.findAll()

    return Appointments
}

module.exports = getAppointmentController