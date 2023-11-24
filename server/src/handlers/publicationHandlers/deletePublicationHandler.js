const deletePub = require("../../controllers/publicationControllers/deletePublicationController")

async function deletePublication(req, res){
    const {id} = req.body

    const response = await deletePub(id)

    return res.json(response)
}

module.exports = deletePublication