const postRoutes = require("../api/post/postRoutes");
const userRoutes = require("../api/user/userRoutes");

module.exports = (server) => {
  userRoutes(server);
  postRoutes(server);
  return server;
};
