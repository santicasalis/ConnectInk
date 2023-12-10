

const { TattooArtist } = require("../../db");
const crypto = require("crypto");

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
    const updateData = {};
    if (fullName) updateData.fullName = fullName;
    if (email) updateData.email = email;
    if (password)
      updateData.password = crypto
        .createHash("sha256")
        .update(password)
        .digest("hex");
    if (phone) updateData.phone = phone;
    if (instagram) updateData.instagram = instagram;
    if (description) updateData.description = description;
    if (address) updateData.address = address;
    if (location) updateData.location = location;
    if (shopName) updateData.shopName = shopName;
    if (image) updateData.image = image;

    await TattooArtist.update(updateData, { where: { id: id } });
    return "Profile updated successfully";
  } else {
    return "Not found";
  }
};

module.exports = updateTattooArtist;
