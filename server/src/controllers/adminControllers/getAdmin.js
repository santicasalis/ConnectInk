const {Admin} = require("../../db")

async function getAppointmentController(){
    const admins = Admin.findAll()

    return admins
}

module.exports = getAdminController