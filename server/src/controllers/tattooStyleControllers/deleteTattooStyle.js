const { TattooStyle } = require("../../db");

const deleteTattoStyle = async (id) => {
  const tattooStyleFound = await TattooStyle.findByPk(id);
  if (tattooStyleFound) {
    await TattooStyle.destroy({ where: { id } });
    return "Tattoo Style deleted successfully";
  } else {
    return "Not found";
  }
};

module.exports = deleteTattoStyle;
