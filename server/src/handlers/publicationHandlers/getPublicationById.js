const getPubById = require("../../controllers/publicationControllers/getPubById")

async function getPublicationById(req, res){
    const {id} = req.params

    const publication = await getPubById(id)

    return res.status(200).json(publication)
}
module.exports = getPublicationById