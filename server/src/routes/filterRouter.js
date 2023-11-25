const {Router} =require('express')
const filterRouter = Router()
const getTattooArtistFilteredHandler = require('../handlers/filterHandlers/getTattooArtistFilteredHandler')

filterRouter.post('/', getTattooArtistFilteredHandler)

module.exports = filterRouter