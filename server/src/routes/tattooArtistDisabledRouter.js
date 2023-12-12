const { Router } = require("express");
const getTattooArtistsdisabledHandler = require("../handlers/tattooArtistDisabledhandlers/getTattooArtistsDisabledhandler");

const tattooArtistDisabledRouter = Router();

tattooArtistDisabledRouter.get("/", getTattooArtistsdisabledHandler);

module.exports = tattooArtistDisabledRouter;
