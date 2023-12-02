const {Publication} = require("../../db")

const getPublicationsByArtistId = async (id) => {
    const publications = await Publication.findAll({where: {TattooArtistId: id}})

    const publicationsClean = publications.map((publication) => {
        return {
            id: publication.id,
            description: publication.description,
            image: publication.image,
            createdAt: publication.createdAt,
            updatedAt: publication.updatedAt,
        }
    })

    return publicationsClean
}

module.exports = getPublicationsByArtistId