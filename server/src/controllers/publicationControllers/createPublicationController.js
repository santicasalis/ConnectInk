const {Publication} = require("../../db")

async function createPub (description, image) {
    const publication = await Publication.create({description, image})

    return publication
}

module.exports = createPub