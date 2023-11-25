const {Publication} = require("../../db")
async function getPubById(id){
    const publication = await Publication.findByPk(id)

    return publication
} 

module.exports = getPubById