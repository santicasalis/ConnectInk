const { Router } = require("express");
const getTattooArtistsHandler = require("../handlers/tattooArtistHandlers/getTattooArtistsHandler");
const getTattooArtistByIdHandler = require("../handlers/tattooArtistHandlers/getTattooArtistByIdHandler");
const createTattooArtistHandler = require("../handlers/tattooArtistHandlers/createTattooArtistHandler");
const updateTattooArtistHandler = require("../handlers/tattooArtistHandlers/updateTattooArtistHandler");
const deleteTattooArtistHandler = require("../handlers/tattooArtistHandlers/deleteTattooArtistHandler");

const tattooArtistRouter = Router();

tattooArtistRouter.get("/", getTattooArtistsHandler);
tattooArtistRouter.get("/:id", getTattooArtistByIdHandler);
tattooArtistRouter.post("/", createTattooArtistHandler);
tattooArtistRouter.put("/:id", updateTattooArtistHandler);
tattooArtistRouter.delete("/:id", deleteTattooArtistHandler);

module.exports = tattooArtistRouter;
