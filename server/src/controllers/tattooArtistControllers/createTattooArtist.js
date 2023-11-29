const { TattooArtist, TattooStyle } = require("../../db");
const crypto = require("crypto");

const createTattooArtist = async (
  tokenId,
  fullName,
  email,
  password,
  phone,
  instagram,
  description,
  address,
  location,
  shopName,
  image,
  tattooStyle
) => {
  const newTattooArtist = await TattooArtist.create({
    tokenId,
    fullName,
    email,
    password: crypto.createHash("sha256").update(password).digest("hex"),
    phone,
    instagram,
    description,
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
