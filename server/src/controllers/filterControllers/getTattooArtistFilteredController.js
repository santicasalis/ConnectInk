const { TattooArtist, TattooStyle } = require('../../db')
const { Op } = require('sequelize')

    const getTattooArtistFiltered = async (location, styles) => {
        const tattooArtistsFound = await TattooArtist.findAll({
            where: {
                location: {
                    [Op.iLike]: `%${location}%`
                }
            },
            include: [
                {
                    model: TattooStyle,
                    where: {
                        name: {
                            [Op.in]: styles
                        }
                    }
                }
            ]
        });
    return tattooArtistsFound

}

module.exports = getTattooArtistFiltered

