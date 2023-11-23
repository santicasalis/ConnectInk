const { Router } = require("express");
const router = Router();

const tattooArtistsRouter = require("./tattooArtistRouter");
const imageRouter = require("./imageRouter")

router.use("/tattooArtists", tattooArtistsRouter);
router.use("/image", imageRouter)

module.exports = router;
