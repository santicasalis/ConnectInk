const { Router } = require("express");
const router = Router();

const tattooArtistsRouter = require("./tattooArtistRouter");
const customerRouter = require("./customerRouter")
const publicationRouter = require("./publicationRouter")
const tattooRouter = require("./tattooRouter");
const tattoStyleRouter = require("./tattooStyleRouter");
const filterRouter = require("./filterRouter")

router.use("/tattooStyles", tattoStyleRouter);
router.use("/tattooArtists", tattooArtistsRouter);
router.use("/tattoo", tattooRouter);
router.use("/publications", publicationRouter);
router.use("/customer", customerRouter)
router.use("/filter", filterRouter)

module.exports = router;
