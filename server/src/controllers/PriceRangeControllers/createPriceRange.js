const { PriceRange, TattooArtist } = require("../../db");

const createPriceRange = async (artistId, size, priceMin, priceMax ) => {
  
  const tattooArtist = await TattooArtist.findByPk(artistId);
  if (!tattooArtist) {
    throw new Error("Artist not found");
  }

  try {
    const newPriceRange = await PriceRange.create({
      size,
      priceMin,
      priceMax,
    });

    tattooArtist.addPriceRange(PriceRange);

    return newPriceRange;
  } catch (error) {
    throw error;
  }
};

module.exports = createPriceRange;
