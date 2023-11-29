const { TattooArtist } = require("../../db");

const updateTattooArtist = async (
  id,
  fullName,
  email,
  password,
  phone,
  instagram,
  description,
  address,
  location,
  shopName,
  image
) => {
  const tattooArtistFound = await TattooArtist.findByPk(id);
  if (tattooArtistFound) {
    await TattooArtist.update(
      {
        fullName: fullName,
        email: email,
        password: password,
        phone: phone,
        instagram: instagram,
        description: description,
        address: address,
        location: location,
        shopName: shopName,
        image: image,
      },
      { where: { id: id } }
    );
    return "Profile updated successfully";
  } else {
    return "Not found";
  }
};

module.exports = updateTattooArtist;
