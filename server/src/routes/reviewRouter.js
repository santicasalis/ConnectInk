const { Router } = require("express");
const reviewRouter = Router();

const getReviewHandler = require("../handlers/reviewHandlers/getReviewsHandler");
const getReviewByIdHandler = require("../handlers/reviewHandlers/getReviewByIdHandler")
const createReviewHandler = require("../handlers/reviewHandlers/createReviewHandler");
const deleteReviewHandler = require("../handlers/reviewHandlers/deleteReviewHandler");

reviewRouter.get("/", getReviewHandler);
reviewRouter.get("/:id", getReviewByIdHandler);
reviewRouter.post("/", createReviewHandler);
reviewRouter.delete("/:id", deleteReviewHandler);

module.exports = reviewRouter;
