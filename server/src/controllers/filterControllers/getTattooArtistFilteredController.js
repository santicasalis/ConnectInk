const { TattooArtist, TattooStyle, Publication } = require('../../db')
const { Op } = require('sequelize')

    const getTattooArtistFiltered = async (location , styles) => {
        if(styles.length > 0) {
            try {

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
                        } , 
                        { model: Publication, attributes: ["description", "image"] }
                    ]
                });

                return tattooArtistsFound
            } catch (error) {
                console.log(error)
            }

        } else  {
            try {

            const tattooArtistsFound = await TattooArtist.findAll({
                where: {
                    location: {
                        [Op.iLike]: `%${location}%`
                    }
                },
                include: [
                    { model: TattooStyle, attributes: ["name"] },
                    { model: Publication, attributes: ["description", "image"] }
                  ]
            });

            return tattooArtistsFound
        } catch (error) {
            console.log(error)
        } 
    }

}

module.exports = getTattooArtistFiltered