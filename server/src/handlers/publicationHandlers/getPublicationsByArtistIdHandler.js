const getPublicationsByArtistId = require("../../controllers/publicationControllers/getPublicationsByArtistId")

const getPublicationsByArtistIdHandler = async (req, res) => {
    const {id} = req.body

    try{
        const publications = await getPublicationsByArtistId(id)

        return res.status(200).json(publications)
    } catch(error) {
        return res.status(500).send(error.message)
    }
}

module.exports = getPublicationsByArtistIdHandler