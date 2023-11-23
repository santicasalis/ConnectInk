const getImageController = require("../../controllers/imageControllers/getImageController")

async function getImageHandler(req, res) {
    const data = await req.formData()
    
    const response = await getImageController(data)
}

module.exports = getImageHandler