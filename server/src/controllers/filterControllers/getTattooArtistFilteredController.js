const { TattooArtist, TattooStyle, Publication } = require("../../db");
const { Op } = require("sequelize");

const getTattooArtistFiltered = async (location, styles) => {
  if (styles.length > 0) {
    try {
      const tattooArtistsFound = await TattooArtist.findAll({
        where: {
          location: {
            [Op.iLike]: `%${location}%`,
            disabled:false 
          },
        },
        include: [
          {
            model: TattooStyle,
            where: {
              name: {
                [Op.in]: styles,
              },
            },
          },
          { model: Publication, attributes: ["description", "image"] },
        ],
      });

      const tattooArtistsFoundCleaner = tattooArtistsFound.map((artist) => ({
        id: artist.id,
        name: artist.name,
        lastName: artist.lastName,
        email: artist.email,
        phone: artist.phone,
        location: artist.location,
        address: artist.address,
        shopName: artist.shopName,
        image: artist.image,
        disabled: artist.disabled,
        tattooStyles: artist.TattooStyles?.map(
          (tattooStyle) => tattooStyle.name
        ),
        publications: artist.Publications?.map((publication) => {
          return {
            description: publication.description,
            image: publication.image,
          };
        }),
      }))
      return tattooArtistsFoundCleaner;
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    try {
      const tattooArtistsFound = await TattooArtist.findAll({
        where: {
          location: {
            [Op.iLike]: `%${location}%`, 
            disabled:false 
          },
        },
        include: [
          { model: TattooStyle, attributes: ["name"] },
          { model: Publication, attributes: ["description", "image"] },
        ],
      });

      const tattooArtistsFoundCleaner = tattooArtistsFound.map((artist) => ({
        id: artist.id,
        name: artist.name,
        lastName: artist.lastName,
        email: artist.email,
        phone: artist.phone,
        location: artist.location,
        address: artist.address,
        shopName: artist.shopName,
        image: artist.image,
        disabled: artist.disabled,
        tattooStyles: artist.TattooStyles?.map(
          (tattooStyle) => tattooStyle.name
        ),
        publications: artist.Publications?.map((publication) => {
          return {
            description: publication.description,
            image: publication.image,
          };
        }),
      }))

      return tattooArtistsFoundCleaner;
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = getTattooArtistFiltered;
