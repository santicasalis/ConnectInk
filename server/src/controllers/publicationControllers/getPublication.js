const {Publication} = require("../../db")

async function getPublicationController(){
    const publications = Publication.findAll()

    return publications
}

module.exports = getPublicationController