const { TattooArtist } = require("../../db");

const updateTattooArtist = async (
  id,
  name,
  lastName,
  email,
  password,
  phone,
  address,
  location,
  shopName
) => {
  const tattooArtistFound = await TattooArtist.findByPk(id);
  if (tattooArtistFound) {
    await TattooArtist.update(
      {
        name: name,
        lastName: lastName,
        email: email,
        password: password,
        phone: phone,
        address: address,
        location: location,
        shopName: shopName,
      },
      { where: { id: id } }
    );
    return "Profile updated successfully";
  } else {
    return "Not found";
  }
};

module.exports = updateTattooArtist;
