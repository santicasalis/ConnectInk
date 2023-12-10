const {
  TattooArtist,
  TattooStyle,
  Publication,
  Review,
} = require("../../db");

const getTattooArtists = async () => {
  const allTattooArtists = await TattooArtist.findAll({
    where: { disabled: false },
    include: [
      { model: TattooStyle, attributes: ["name"] },
      {
        model: Publication,
        attributes: ["id","description", "image", "createdAt", "updatedAt"],
        where: { disabled: false },
        required: false
      },
      {
        model: Review,
        as: "reviews",
        foreignKey: "TattooArtist_Review",
        attributes: ["rating", "comment"],
        where: { disabled: false },
        required: false
      },
    ],
  });
  const tattooArtistCleaner = allTattooArtists.map((tattooArtist) => ({
    id: tattooArtist.id,
    fullName: tattooArtist.fullName,
    email: tattooArtist.email,
    phone: tattooArtist.phone,
    instagram: tattooArtist.instagram,
    description: tattooArtist.description,
    location: tattooArtist.location,
    address: tattooArtist.address,
    shopName: tattooArtist.shopName,
    image: tattooArtist.image,
    disabled: tattooArtist.disabled,
    tattooStyles: tattooArtist.TattooStyles?.map(
      (tattooStyle) => tattooStyle.name
    ),
    publications: tattooArtist.Publications?.filter((publication) => !publication.disabled).map((publication) => {
      return {
        id: publication.id,
        description: publication.description,
        image: publication.image,
        createdAt: publication.createdAt,
        updatedAt: publication.updatedAt,
      };
    }),
    reviews: tattooArtist.reviews?.map((review) => {
      return {
        comment: review.comment,
        rating: review.rating,
      }
    })
  }));

  return tattooArtistCleaner;
};

module.exports = getTattooArtists;
