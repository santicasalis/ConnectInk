const { TattooArtist } = require("../../db");

const deleteTattooArtist = async (id) => {
  const tattooArtistFound = await TattooArtist.findByPk(id);
  if (tattooArtistFound) {
    await TattooArtist.update(
      {
        disabled: !tattooArtistFound.disabled,
      },
      { where: { id: id } }
    );
    return "Update successfully";
  } else {
    return "Not found";
  }
};

module.exports = deleteTattooArtist;
