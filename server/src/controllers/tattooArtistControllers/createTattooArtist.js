const { TattooArtist, TattooStyle } = require("../../db");

const createTattooArtist = async (
  name,
  lastName,
  email,
  password,
  phone,
  location,
  shopName
  //tattooStyle
) => {
  const newTattooArtist = await TattooArtist.create({
    name,
    lastName,
    email,
    password,
    phone,
    location,
    shopName,
  });

  /*const allTattooStyles = await TattooStyle.findAll({
    where: {
      name: tattooStyle,
    },
  });
  
  await allTattooStyles.map((tattooStyle) =>
  newTattooArtist.addTattooStyle(tattooStyle)
  );*/

  return newTattooArtist;
};

module.exports = createTattooArtist;
