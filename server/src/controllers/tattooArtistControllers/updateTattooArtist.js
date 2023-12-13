

const { TattooArtist, TattooStyle } = require("../../db");
const crypto = require("crypto");

const updateTattooArtist = async (
  {id,
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
  tattooStyles}
) => {
  const allStyles = await TattooStyle.findAll()
  const tattooArtistFound = await TattooArtist.findByPk(id, {
    include : [
      { model: TattooStyle, attributes: ["name"], required: false },
    ]
  });
  if (tattooArtistFound) {
    const stylesNames = tattooArtistFound.TattooStyles.map((style) => style.name)
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
    if(tattooStyles.length){
      const newStyles = tattooStyles.filter((style) => !stylesNames.includes(style))
      const removeStyles = stylesNames.filter((style) => !tattooStyles.includes(style))

      newStyles.map(async (style) => {
        const addStyle = allStyles.find((eachStyle) => eachStyle.name == style)
        await tattooArtistFound.addTattooStyle(addStyle.id)
      })

      removeStyles.map(async (style) => {
        const removeStyle = allStyles.find((eachStyle) => eachStyle.name == style)
        await tattooArtistFound.removeTattooStyle(removeStyle.id)
      })
    }

    await TattooArtist.update(updateData, { where: { id: id } });
    return "Profile updated successfully";
  } else {
    return "Not found";
  }
};

module.exports = updateTattooArtist;
