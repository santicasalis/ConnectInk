const getPublication = require("../../controllers/publicationControllers/getPublication");

const getPublicationHandler = async (req, res) => {
  const response = await getPublication();

  return res.status(200).json(response);
};

module.exports = getPublicationHandler;
