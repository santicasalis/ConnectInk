const { Publication } = require("../../db");

const deletePublication = async (id) => {
  const publicationFound = await Publication.findByPk(id);
  if (publicationFound) {
    await Publication.update(
      {
        disabled: true,
      },
      { where: { id: id } }
    );
    return "Publication deleted successfully";
  } else {
    return "Not found";
  }
};

module.exports = deletePublication;
