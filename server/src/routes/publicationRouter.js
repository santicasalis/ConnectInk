const { Router } = require("express");
const publicationRouter = Router();

const getPublicationHandler = require("../handlers/publicationHandlers/getPublicationsHandler");
const getPublicationsByArtistIdHandler = require("../handlers/publicationHandlers/getPublicationsByArtistIdHandler");
const getPublicationByIdHandler = require("../handlers/publicationHandlers/getPublicationByIdHandler");
const createPublicationHandler = require("../handlers/publicationHandlers/createPublicationHandler");
const updatePublicationHandler = require("../handlers/publicationHandlers/updatePublicationHandler");
const deletePublicationHandler = require("../handlers/publicationHandlers/deletePublicationHandler");
const likePublicationHandler = require("../handlers/likePublicationHandler/likePublicationHandler");

publicationRouter.get("/", getPublicationHandler);
publicationRouter.get("/:id", getPublicationByIdHandler);
publicationRouter.post("/", createPublicationHandler);
publicationRouter.put("/:id", updatePublicationHandler);
publicationRouter.delete("/:id", deletePublicationHandler);
publicationRouter.post("/tattooArtistId", getPublicationsByArtistIdHandler);
publicationRouter.post("/publications/:id/like", likePublicationHandler);

module.exports = publicationRouter;
