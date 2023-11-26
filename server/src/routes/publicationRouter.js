const { Router } = require("express");
const publicationRouter = Router();

const getPublicationHandler = require("../handlers/publicationHandlers/getPublicationsHandler");
const getPublicationByIdHandler = require("../handlers/publicationHandlers/getPublicationByIdHandler");
const createPublicationHandler = require("../handlers/publicationHandlers/createPublicationHandler");
const deletePublicationHandler = require("../handlers/publicationHandlers/deletePublicationHandler");

publicationRouter.get("/", getPublicationHandler);
publicationRouter.get("/:id", getPublicationByIdHandler);
publicationRouter.post("/", createPublicationHandler);
publicationRouter.delete("/:id", deletePublicationHandler);

module.exports = publicationRouter;
