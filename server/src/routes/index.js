const { Router } = require("express");
const router = Router();

const tattooArtistsRouter = require("./tattooArtistRouter");
const customerRouter = require("./customerRouter");
const publicationRouter = require("./publicationRouter");
const tattooRouter = require("./tattooRouter");
const tattoStyleRouter = require("./tattooStyleRouter");
const filterRouter = require("./filterRouter");
const timeAvailabilityRouter = require("./timeAvailabilityRouter")
const appointmentRouter = require("./appointmentRouter")

router.use("/tattooStyles", tattoStyleRouter);
router.use("/tattooArtists", tattooArtistsRouter);
router.use("/tattoos", tattooRouter);
router.use("/publications", publicationRouter);
router.use("/customers", customerRouter);
router.use("/filters", filterRouter);
router.use("/timeAvailabilities", timeAvailabilityRouter)
router.use("/appointments", appointmentRouter)

module.exports = router;
