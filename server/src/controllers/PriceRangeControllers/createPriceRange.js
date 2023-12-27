const { PriceRange, TattooArtist } = require("../../db");

const createPriceRange = async (tattooArtistId, size, priceMin, priceMax) => {
 try {
  
   const tattooArtist = await TattooArtist.findByPk(tattooArtistId);
   
   if (tattooArtist === null) {
     return { code: 404, error: "Tattoo artist not found" };
    }
    
    const priceRangeExist = await PriceRange.findOne({
      where: { TattooArtistId: tattooArtistId, size: size },
    });
    if (priceRangeExist) {
      return {
        code: 404,
        error: "A price range for that size already exists",
      };
    }
    
    if (priceMin > priceMax) {
      return {
        code: 400,
        error: "The minimum price must be less than the maximum price",
      };
    }

  try {
    const newPriceRange = await PriceRange.create({
      size,
      priceMin,
      priceMax,
    });
    
    tattooArtist.addPriceRange(newPriceRange);
    return {
      code: 201,
      message: "Price range created successfully",
      data: newPriceRange,
    };
  } catch (error) {
    return { code: 400, error: "Something went wrong" };
  }
} catch (error) {
 console.log(error);
}
};

module.exports = createPriceRange;
