const { Router } = require("express");
const getTattooHandler = require("../handlers/tattooHandlers/getTattooHandler");
const getTattooByIdHandler = require("../handlers/tattooHandlers/getTattooByIdHandler");
const createTattooHandler = require("../handlers/tattooHandlers/createTattooHandler ");
const updateTattooByIdHandler = require("../handlers/tattooHandlers/updateTattooByIdHandler");

const tattooRouter = Router();

tattooRouter.get("/", getTattooHandler);
tattooRouter.get("/:id", getTattooByIdHandler);
tattooRouter.post("/", createTattooHandler);
tattooRouter.put("/:id", updateTattooByIdHandler);

module.exports = tattooRouter;
