const { TattooArtist } = require("../../db");

const updateTattooArtist = async (
  id,
  newName,
  newLastName,
  newEmail,
  newPassword,
  newPhone,
  newLocation,
  newShopName
) => {
  const tattooArtistFound = await TattooArtist.findByPk(id);
  if (tattooArtistFound) {
    await TattooArtist.update(
      {
        name: newName,
        lastName: newLastName,
        email: newEmail,
        password: newPassword,
        phone: newPhone,
        location: newLocation,
        shopName: newShopName,
      },
      { where: { id: id } }
    );
    return "Profile updated successfully";
  } else {
    return "Not found";
  }
};

module.exports = updateTattooArtist;
