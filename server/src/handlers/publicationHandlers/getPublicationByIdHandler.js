const getPublicationById = require("../../controllers/publicationControllers/getPublicationById");

const getPublicationByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const publication = await getPublicationById(id);
    if (publication) {
      return res.status(200).json(publication);
    } else {
      res.status(404).json({ message: "Publication not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = getPublicationByIdHandler;
