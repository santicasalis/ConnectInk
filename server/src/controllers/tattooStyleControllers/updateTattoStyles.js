const { TattooStyle } = require("../../db");

const updateTattoStyles = async (id, name) => {
  const newTattooStyle = await TattooStyle.findByPk(id);
  if (newTattooStyle) {
    await TattooStyle.update(
      {
        name: name,
      },
      { where: { id: id } }
    );
    return "Tattto style updated successfully";
  } else {
    return "Not found";
  }
};

module.exports = updateTattoStyles;
