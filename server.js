const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
process.env.NODE_CONFIG_DIR = `${__dirname}/environments`;
const config = require("config");
const MONGODB_URI = config.get("app.MONGODB_URI");
const PORT = config.get("app.port");
const cors = require("cors");

const server = express();

// <------------ Middleware ------------>

server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.json());
server.use("/images", express.static(path.join(__dirname, "images")));

// <------------- CORS ---------------->

server.use(cors({ origin: "http://localhost:3000" }));

// <------ Server listen and Connecting with MongoDB ------->

server.listen(PORT, () => {
  mongoose.set("useFindAndModify", false);
  mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  });
});

const db = mongoose.connection;

// <------------- Error while Connecting Mongobd ---------------->

db.on("error>>>>>", (err) => {
  console.log(err);
});

// <------------- Mongodb Connection OPEN  ---------------->

db.once("open", () => {
  require("./src/route/index")(server);
  console.log(`Server started on port ${PORT}`);
});
