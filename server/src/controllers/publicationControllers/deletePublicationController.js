const {Publication} = require("../../db")

async function deletePub(id){
    await Publication.destroy({where: {id}})

    return "deleted with success"
}

module.exports = deletePub