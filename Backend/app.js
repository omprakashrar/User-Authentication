const express = require("express");
const app = express();

const authrouter = require("./router/authroute.js");
const databaseconnect = require("./config/databaseConfig.js");
databaseconnect();
const cors = require('cors');
app.use(express.json());

app.use("/api/auth/", authrouter);

//use routers
app.use("/", (req, res) => {
  res.status(200).json({ data: "JWTauth server --updated" });
});
app.use(cors({
  origin: [process.env.CLIENT_URL],
  credentails: true 
}))

module.exports = app;
