const getTattoStyles = require("../../controllers/tattooStyleControllers/getTattooStyles");

const getTattoStylesHandler = async (req, res) => {
  try {
    const allTattoStyles = await getTattoStyles();
    if (allTattoStyles.length > 0) {
      res.status(200).json(allTattoStyles);
    } else {
      res.status(404).json({ message: "Tattoo Styles not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getTattoStylesHandler;
