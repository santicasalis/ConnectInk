const {Admin} = require("../../db")

async function getAdminController(){
    const admins = Admin.findAll()

    return admins
}

module.exports = getAdminController