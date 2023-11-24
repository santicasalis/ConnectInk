const { TattooArtist, TattooStyle } = require('../../db')
const { Op, where } = require('sequelize')


const getTattooArtistFiltered = async (location, styles) => {

    const tattooArtistsFound = await TattooArtist.findAll(
        {where: {location: {[Op.iLike]: `%${location}%`}},
        include: {model: TattooStyle, where: {[Op.iLike]: {[Op.any]: [...styles]} } }})

    return tattooArtistsFound

}

module.exports = getTattooArtistFiltered

