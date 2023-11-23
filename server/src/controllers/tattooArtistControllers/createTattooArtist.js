const { TattooArtist, TattooStyle } = require("../../db");

const createTattooArtist = async (
  name,
  lastName,
  email,
  phone,
  location,
  password,
  shopName
  //tattooStyle
) => {
  const newTattooArtist = await TattooArtist.create({
    name,
    lastName,
    email,
    phone,
    location,
    password,
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

  console.log(newTattooArtist);
  return newTattooArtist;
};

module.exports = createTattooArtist;
