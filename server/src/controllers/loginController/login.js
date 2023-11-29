const { TattooArtist } = require("../../db");

const login = async (email) => {
  const user = await TattooArtist.findOne({
    where: { email: email },
  });

  return user;
};

module.exports = login;
