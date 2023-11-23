const { Router } = require("express");
const publicationRouter = Router();

const getPublicationHandler = require("../handlers/publicationHandlers/getPublicationsHandler")
const getPublicationById = require("../handlers/publicationHandlers/getPublicationById")
const createPublication = require("../handlers/publicationHandlers/createPublicationHandler")
const deletePublication = require("../handlers/publicationHandlers/deletePublicationHandler")

publicationRouter.get("/", getPublicationHandler)
publicationRouter.get("/:id", getPublicationById)
publicationRouter.post("/", createPublication)
publicationRouter.delete("/", deletePublication)

module.exports = publicationRouter;
