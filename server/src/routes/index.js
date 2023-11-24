const { Router } = require("express");
const router = Router();

const tattooArtistRouter = require("./tattooArtistRouter");
const tattoStyleRouter = require("./tattooStyleRouter");

router.use("/tattooArtists", tattooArtistRouter);
router.use("/tattooStyles", tattoStyleRouter);

module.exports = router;
