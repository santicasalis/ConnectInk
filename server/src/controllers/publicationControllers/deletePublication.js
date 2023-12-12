const { Publication } = require("../../db");

const deletePublication = async (id) => {
  const publicationFound = await Publication.findByPk(id);
  if (publicationFound) {
    await Publication.update(
      {
        disabled: !publicationFound.disabled,
      },
      { where: { id: id } }
    );
    return "update successfully";
  } else {
    return "Not found";
  }
};

module.exports = deletePublication;
