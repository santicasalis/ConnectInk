const { Router } = require("express");
const imageRouter = Router();
const getImageHandler = require("../handlers/imageHandlers/getImageHandler")

imageRouter.post("/", getImageHandler);

module.exports = imageRouter
