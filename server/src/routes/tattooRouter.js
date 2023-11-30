const { Router } = require("express");
const tattooRouter = Router();

const getTattooHandler = require("../handlers/tattooHandlers/getTattooHandler");
const getTattooByIdHandler = require("../handlers/tattooHandlers/getTattooByIdHandler");
const createTattooHandler = require("../handlers/tattooHandlers/createTattooHandler ");
const updateTattooByIdHandler = require("../handlers/tattooHandlers/updateTattooByIdHandler");

tattooRouter.get("/", getTattooHandler);
tattooRouter.get("/:id", getTattooByIdHandler);
tattooRouter.post("/", createTattooHandler);
tattooRouter.put("/:id", updateTattooByIdHandler);

module.exports = tattooRouter;
