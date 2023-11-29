const { TattooArtist, TattooStyle, Publication } = require("../../db");
const { Op } = require("sequelize");

const getTattooArtistFiltered = async (location, name, styles) => {
  if (styles.length > 0) {
    try {
      const tattooArtistsFound = await TattooArtist.findAll({
        where: {
          location: {
            [Op.iLike]: `%${location}%`,
          },
          [Op.or]: [
            { fullName: { [Op.iLike]: `%${name}%` } },
            { shopName: { [Op.iLike]: `%${name}%` } },
          ],
          disabled: false,
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
        fullName: artist.fullName,
        email: artist.email,
        phone: artist.phone,
        instagram: artist.instagram,
        description: artist.description,
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
      }));
      return tattooArtistsFoundCleaner;
    } catch (error) {
      throw Error(error.message);
    }
  } else {
    try {
      const tattooArtistsFound = await TattooArtist.findAll({
        where: {
          location: {
            [Op.iLike]: `%${location}%`,
          },
          [Op.or]: [
            { fullName: { [Op.iLike]: `%${name}%` } },
            { shopName: { [Op.iLike]: `%${name}%` } },
          ],
          disabled: false,
        },
        include: [
          { model: TattooStyle, attributes: ["name"] },
          { model: Publication, attributes: ["description", "image"] },
        ],
      });

      const tattooArtistsFoundCleaner = tattooArtistsFound.map((artist) => ({
        id: artist.id,
        fullName: artist.fullName,
        email: artist.email,
        phone: artist.phone,
        instagram: artist.instagram,
        description: artist.description,
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
      }));

      return tattooArtistsFoundCleaner;
    } catch (error) {
      throw Error(error.message);
    }
  }
};

module.exports = getTattooArtistFiltered;