const { Router } = require("express");
const getTattooArtistsHandler = require("../handlers/tattooArtistHandlers/getTattooArtistsHandler");
const getTattooArtistByIdHandler = require("../handlers/tattooArtistHandlers/getTattooArtistByIdHandler");
const createTattooArtistHandler = require("../handlers/tattooArtistHandlers/createTattooArtistHandler");
const updateTattooArtistHandler = require("../handlers/tattooArtistHandlers/updateTattooArtistHandler");
const tattooArtistRouter = Router();

tattooArtistRouter.get("/", getTattooArtistsHandler);
tattooArtistRouter.get("/:id", getTattooArtistByIdHandler);
tattooArtistRouter.post("/", createTattooArtistHandler);
tattooArtistRouter.put("/:id", updateTattooArtistHandler);

module.exports = tattooArtistRouter;
