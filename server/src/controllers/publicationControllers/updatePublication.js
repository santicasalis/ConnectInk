const { Publication } = require("../../db");

const updatePublication = async (id, description) => {
  const publicationFound = await Publication.findByPk(id);
  if (publicationFound) {
    await Publication.update(
      {
        description: description,
      },
      { where: { id: id } }
    );
    return "Publication updated successfully";
  } else {
    return "Not found";
  }
};

module.exports = updatePublication;
