const { Router } = require("express");
const commentRouter = Router();

// const getcommentHandler = require("../handlers/commentHandlers/getcommentHandler");
const getCommentsBypublicationIdHandler = require("../handlers/commentHandlers/getCommentsBypublicationIdHandler");
const createCommentHandler = require("../handlers/commentHandlers/createCommentHandler");
const deleteCommentHandler = require("../handlers/commentHandlers/deleteCommentHandler");

// commentRouter.get("/", getcommentHandler);
commentRouter.post("/publication", getCommentsBypublicationIdHandler);
commentRouter.post("/", createCommentHandler);
commentRouter.delete("/:id", deleteCommentHandler);

module.exports = commentRouter;
