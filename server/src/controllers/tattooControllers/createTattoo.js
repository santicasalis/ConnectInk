const { Tattoo } = require("../../db");

const createTattoo = async (size, image, bodyPlace, duration) => {
  try {
    const newTattoo = await Tattoo.create({
      size,
      image,
      bodyPlace,
      duration,
    });

    return newTattoo;
  } catch (error) {
    throw error;
  }
};

module.exports = createTattoo;
