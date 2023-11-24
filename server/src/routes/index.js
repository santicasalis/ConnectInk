const { Router } = require("express");
const router = Router();

const tattooArtistsRouter = require("./tattooArtistRouter");
const customerRouter = require("./customerRouter")
const publicationRouter = require("./publicationRouter")
const tattooRouter = require("./tattooRouter");

router.use("/tattooArtists", tattooArtistsRouter);
router.use("/tattoo", tattooRouter);
router.use("/publications", publicationRouter);
router.use("/customer", customerRouter)

module.exports = router;
