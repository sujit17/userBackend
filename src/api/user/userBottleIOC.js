const UserService = require("./userService");
const UserController = require("./userController");
const UserRepositry = require("./userRepositry");

module.exports = (bottle) => {
  bottle.service("UserReposirty", UserRepositry);
  bottle.service("UserService", UserService, "UserReposirty");
  bottle.service("UserController", UserController, "UserService");
  return bottle;
};
