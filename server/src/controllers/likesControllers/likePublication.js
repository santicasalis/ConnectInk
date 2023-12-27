const { Publication } = require("../../db");

const likePublication = async (id) => {
  const publication = await Publication.findByPk(id);
  if (publication) {
    await Publication.update(
      { likes: publication.likes + 1 },
      { where: { id: id } }
    );
    return "Like agregado correctamente";
  } else {
    return "Publicacion no encontrada";
  }
};

module.exports = likePublication;
