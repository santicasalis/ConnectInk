const { Router } = require("express");
const router = Router();

const tattooArtistsRouter = require("./tattooArtistRouter");
const customerRouter = require("./customerRouter")

router.use("/tattooArtists", tattooArtistsRouter);
router.use("/customer", customerRouter)

module.exports = router;
