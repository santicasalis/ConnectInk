const { Tattoo } = require("../../db");

const updateTattoo = async (id, size, image, bodyPlace, duration) => {
  const tattooFounded = await Tattoo.findByPk(id);
  if (tattooFounded) {
    await Tattoo.update(
      {
        size: size,
        image: image,
        bodyPlace: bodyPlace,
        duration: duration,
      },
      { where: { id: id } }
    );
    return "Tatto updated successfully";
  } else {
    return "Not found";
  }
};

module.exports = updateTattoo;
