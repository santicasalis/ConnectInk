const createPub = require("../../controllers/publicationControllers/createPublicationController")

async function createPublication(req, res){
    const {description, image} = req.body

    const publication = await createPub(description, image)

    return res.json(publication)
}

module.exports = createPublication