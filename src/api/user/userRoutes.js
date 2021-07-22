const { container } = require("../../modules/bottle");

module.exports = (server) => {
  server.get("/user", container.UserController.getAllUser);
  server.post("/user", container.UserController.createUser);
  server.get("/user/login", container.UserController.getOneUser);
};
