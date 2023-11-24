const { Tattoo } = require("../../db");

const getTattooById = async (id) => {
  const tattoo = await Tattoo.findByPk(id);
  return {
    id: tattoo.id,
    size: tattoo.size,
    image: tattoo.image,
    duration: tattoo.duration,
    bodyPlace: tattoo.bodyPlace,
  };
};

module.exports = getTattooById;
