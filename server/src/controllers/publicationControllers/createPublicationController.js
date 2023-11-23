const {Publication} = require("../../db")

export default async function (description, image) {
    const publication = await Publication.create({description, image})

    
}