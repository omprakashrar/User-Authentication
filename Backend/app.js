const express = require("express");
const app = express();

const authrouter = require("./router/authroute.js");
const databaseconnect = require("./config/databaseConfig.js");
databaseconnect();
app.use(express.json());

app.use("/api/auth/", authrouter);

//use routers
app.use("/", (req, res) => {
  res.status(200).json({ data: "JWTauth server --updated" });
});

module.exports = app;
