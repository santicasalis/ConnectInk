const { TattooArtist, Publication } = require("../../db");

const createPublication = async (artist_id, title, description, image) => {
  const publication = await Publication.create({
    title,
    description,
    image,
  });

  const tattooArtist = await TattooArtist.findByPk(artist_id);
  tattooArtist.addPublication(publication);

  return "Publicación creada con éxito";
};

module.exports = createPublication;
