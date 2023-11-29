const { Router } = require("express");
const publicationRouter = Router();

const getPublicationHandler = require("../handlers/publicationHandlers/getPublicationsHandler");
const getPublicationByIdHandler = require("../handlers/publicationHandlers/getPublicationByIdHandler");
const createPublicationHandler = require("../handlers/publicationHandlers/createPublicationHandler");
const updatePublicationHandler = require("../handlers/publicationHandlers/updatePublicationHandler");
const deletePublicationHandler = require("../handlers/publicationHandlers/deletePublicationHandler");

publicationRouter.get("/", getPublicationHandler);
publicationRouter.get("/:id", getPublicationByIdHandler);
publicationRouter.post("/", createPublicationHandler);
publicationRouter.put("/:id", updatePublicationHandler);
publicationRouter.delete("/:id", deletePublicationHandler);

module.exports = publicationRouter;
