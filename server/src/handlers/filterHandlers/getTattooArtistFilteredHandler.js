const getTattooArtistFiltered = require('../../controllers/filterControllers/getTattooArtistFilteredController')

const getTattooArtistFilteredHandler = async (req, res) => {

    const { location, tattooStyle } = req.body
    
    console.log(req.body);

    try {

        const tattooArtistsFound = await getTattooArtistFiltered(location, tattooStyle)

        res.status(200).json(tattooArtistsFound)

    } catch (error) {
        
        res.status(400).json({ error: error.message });
    }

}

module.exports = getTattooArtistFilteredHandler