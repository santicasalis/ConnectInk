const { TattooArtist, Publication } = require("../../db");

const createPublication = async (tattooArtistId, title, description, image) => {
  const publication = await Publication.create({
    title,
    description,
    image,
  });

  const tattooArtist = await TattooArtist.findByPk(tattooArtistId);
  tattooArtist.addPublication(publication);

  return "Publicación creada con éxito";
};

module.exports = createPublication;
