const { Router } = require("express");
const getTattoStylesHandler = require("../handlers/tattooStyleHandlers/getTattooStylesHandler");
const createTattoStyleHandler = require("../handlers/tattooStyleHandlers/createTattooStyleHandler");
const deleteTattoStyleHandler = require("../handlers/tattooStyleHandlers/deleteTattooStyleHandler");

const tattoStyleRouter = Router();

tattoStyleRouter.get("/", getTattoStylesHandler);
tattoStyleRouter.post("/", createTattoStyleHandler);
tattoStyleRouter.delete("/:id", deleteTattoStyleHandler);

module.exports = tattoStyleRouter;
