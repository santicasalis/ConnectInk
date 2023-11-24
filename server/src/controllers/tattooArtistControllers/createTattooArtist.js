const { TattooArtist, TattooStyle } = require("../../db");

const createTattooArtist = async (
  name,
  lastName,
  email,
  password,
  phone,
  address,
  location,
  shopName,
  image,
  tattooStyle
) => {
  const newTattooArtist = await TattooArtist.create({
    name,
    lastName,
    email,
    password,
    phone,
    address,
    location,
    shopName,
    image,
  });

  const allTattooStyles = await TattooStyle.findAll({
    where: {
      name: tattooStyle,
    },
  });

  await allTattooStyles?.map((tattooStyle) =>
    newTattooArtist.addTattooStyle(tattooStyle)
  );

  return newTattooArtist;
};

module.exports = createTattooArtist;
