const { Router } = require("express");
const router = Router();

const tattooArtistsRouter = require("./tattooArtistRouter");
const customerRouter = require("./customerRouter");
const publicationRouter = require("./publicationRouter");
const tattooRouter = require("./tattooRouter");
const tattoStyleRouter = require("./tattooStyleRouter");
const filterRouter = require("./filterRouter");
const timeAvailabilityRouter = require("./timeAvailabilityRouter");
const appointmentRouter = require("./appointmentRouter");
const loginRouter = require("./loginRouter");
const timeAvailabilityExceptionRouter = require("./timeAvailabilityExceptionRouter");
//const nodemailerRouter = require("./nodemailerRouter");

router.use("/tattooStyles", tattoStyleRouter);
router.use("/tattooArtists", tattooArtistsRouter);
router.use("/tattoos", tattooRouter);
router.use("/publications", publicationRouter);
router.use("/customers", customerRouter);
router.use("/filters", filterRouter);
router.use("/timeAvailabilities", timeAvailabilityRouter);
router.use("/timeAvailabilityExceptions", timeAvailabilityExceptionRouter);
router.use("/appointments", appointmentRouter);
router.use("/auth", loginRouter);
//router.use("/nodemailer", nodemailerRouter);

module.exports = router;
