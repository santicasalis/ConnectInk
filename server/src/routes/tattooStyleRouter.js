const { Router } = require("express");
const getTattoStylesHandler = require("../handlers/tattooStyleHandlers/getTattoStylesHandler");
const createTattoStyleHandler = require("../handlers/tattooStyleHandlers/createTattoStyleHandler");
const deleteTattoStyleHandler = require("../handlers/tattooStyleHandlers/deleteTattoStyleHandler");

const tattoStyleRouter = Router();

tattoStyleRouter.get("/", getTattoStylesHandler);
tattoStyleRouter.post("/", createTattoStyleHandler);
tattoStyleRouter.delete("/:id", deleteTattoStyleHandler);

module.exports = tattoStyleRouter;
