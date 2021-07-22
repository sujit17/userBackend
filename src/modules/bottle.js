/* eslint-disable import/no-dynamic-require */

const Bottle = require("bottlejs");
const glob = require("glob");
const path = require("path");

const bottel = new Bottle();

glob
  .sync(path.join(path.resolve(__dirname), "../**/*BottleIOC.js"))
  .forEach((match) => {
    require(match)(bottel);
  });

module.exports = bottel;
