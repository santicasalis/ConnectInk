const { Router } = require("express");
const router = Router();

const tattooArtistsRouter = require("./tattooArtistRouter");
const publicationRouter = require("./publicationRouter")

router.use("/tattooArtists", tattooArtistsRouter);
router.use("/publications", publicationRouter);

module.exports = router;
