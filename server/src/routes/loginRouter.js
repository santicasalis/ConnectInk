const { Router } = require("express");
const loginHandler = require("../handlers/loginHandler/loginHandler");

const loginRouter = Router();

loginRouter.post("/", loginHandler);

module.exports = loginRouter;
