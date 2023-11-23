const { Router } = require("express");
const router = Router();

const tattooArtistsRouter = require("./tattooArtistRouter");

router.use("/tattooArtists", tattooArtistsRouter);

module.exports = router;
