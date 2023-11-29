const { Router } = require("express");
const router = Router();

const tattooArtistsRouter = require("./tattooArtistRouter");
const customerRouter = require("./customerRouter");
const publicationRouter = require("./publicationRouter");
const tattooRouter = require("./tattooRouter");
const tattoStyleRouter = require("./tattooStyleRouter");
const filterRouter = require("./filterRouter");

// const loginRouter = require("./loginRouter");


const nodemailerRouter = require("./nodemailerRouter");


router.use("/tattooStyles", tattoStyleRouter);
router.use("/tattooArtists", tattooArtistsRouter);
router.use("/tattoos", tattooRouter);
router.use("/publications", publicationRouter);
router.use("/customers", customerRouter);
router.use("/filters", filterRouter);

// router.use("/auth", loginRouter);

router.use("/nodemailer", nodemailerRouter);


module.exports = router;
