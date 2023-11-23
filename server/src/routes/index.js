const { Router } = require("express");
const router = Router();

const tattooArtistsRouter = require("./tattooArtistRouter");
const tattooRouter = require("./tattooRouter");

router.use("/tattooArtists", tattooArtistsRouter);
router.use("/tattoo", tattooRouter);

module.exports = router;
