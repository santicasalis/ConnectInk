const { Router } = require("express");
const router = Router();

const tattooArtistsRouter = require("./tattooArtistRouter");
const customerRouter = require("./customerRouter");
const publicationRouter = require("./publicationRouter");
const PriceRangeRouter = require("./priceRangeRouter");
const tattoStyleRouter = require("./tattooStyleRouter");
const filterRouter = require("./filterRouter");
const timeAvailabilityRouter = require("./timeAvailabilityRouter");
const appointmentRouter = require("./appointmentRouter");
const loginRouter = require("./loginRouter");
const nodemailerRouter = require("./nodemailerRouter");
const timeAvailabilityExceptionRouter= require("./timeAvailabilityExceptionRouter")
const adminRouter= require("./adminRouter")
const reviewRouter = require("./reviewRouter")

router.use("/tattooStyles", tattoStyleRouter);
router.use("/tattooArtists", tattooArtistsRouter);
router.use("/priceRange", PriceRangeRouter);
router.use("/publications", publicationRouter);
router.use("/customers", customerRouter);
router.use("/filters", filterRouter);
router.use("/timeAvailabilities", timeAvailabilityRouter);
router.use("/timeAvailabilityExceptions", timeAvailabilityExceptionRouter);
router.use("/appointments", appointmentRouter);
router.use("/auth", loginRouter);
router.use("/nodemailer", nodemailerRouter);
router.use("/admins", adminRouter);
router.use("/reviews", reviewRouter);

module.exports = router;
