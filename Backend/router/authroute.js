const express = require("express");
const { signup, signin } = require("../controller/authcontroller");
const authrouter = express.Router();

authrouter.post("/signup", signup);
authrouter.post("/signin", signin);

module.exports = authrouter;
