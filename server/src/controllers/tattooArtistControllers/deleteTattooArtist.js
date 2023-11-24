const { TattooArtist } = require("../../db");

const deleteTattooArtist = async (id) => {
  const tattooArtistFound = await TattooArtist.findByPk(id);
  if (tattooArtistFound) {
    await TattooArtist.update(
      {
        disabled: true,
      },
      { where: { id: id } }
    );
    return "Profile deleted successfully";
  } else {
    return "Not found";
  }
};

module.exports = deleteTattooArtist;
