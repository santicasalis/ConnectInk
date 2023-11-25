const getPublicationController = require("../../controllers/publicationControllers/getPublicationController")

async function getPublicationHandler (req, res) {
    const response = await getPublicationController()

    return res.status(200).json(response)
}

module.exports = getPublicationHandler