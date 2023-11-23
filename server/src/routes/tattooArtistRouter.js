const { Router } = require("express");
const getTattooArtistsHandler = require("../handlers/tattooArtistHandlers/getTattooArtistsHandler");
const getTattooArtistByIdHandler = require("../handlers/tattooArtistHandlers/getTattooArtistByIdHandler");
const createTattooArtistHandler = require("../handlers/tattooArtistHandlers/createTattooArtistHandler");
const tattooArtistRouter = Router();

tattooArtistRouter.get("/", getTattooArtistsHandler);
tattooArtistRouter.get("/:id", getTattooArtistByIdHandler);
tattooArtistRouter.post("/", createTattooArtistHandler);

module.exports = tattooArtistRouter;
