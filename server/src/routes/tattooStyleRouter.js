const { Router } = require("express");
const tattoStyleRouter = Router();

const getTattoStylesHandler = require("../handlers/tattooStyleHandlers/getTattooStylesHandler");
const createTattoStyleHandler = require("../handlers/tattooStyleHandlers/createTattooStyleHandler");
const deleteTattoStyleHandler = require("../handlers/tattooStyleHandlers/deleteTattooStyleHandler");
const updateTattoStylesHandler = require("../handlers/tattooStyleHandlers/updateTattoStylesHandler");

tattoStyleRouter.get("/", getTattoStylesHandler);
tattoStyleRouter.post("/", createTattoStyleHandler);
tattoStyleRouter.delete("/:id", deleteTattoStyleHandler);
tattoStyleRouter.put("/:id", updateTattoStylesHandler);

module.exports = tattoStyleRouter;
