const { Admin} = require("../../db")

const createAdmin = async (fullName, email, password) => {
    const admin = await Admin.create({
        fullName, 
        email, 
        password
    })

    return admin
}

module.exports = createAdmin