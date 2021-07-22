const APIError = require("../../utils/APIError");
const logger = require("../../utils/logger");
const httpStatus = require("http-status");
const log = require("../../utils/logger");

class UserController {
  constructor(UserService, redisCon) {
    this.userService = UserService;
    this.redisCon = redisCon;
  }

  getAllUser = async (req, res, next) => {
    try {
      const data = await this.userService.findAllUser();
      res.json(data);
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };

  getOneUser = async (req, res, next) => {
    console.log(req.body);
    try {
      const data = await this.userService.getUserByEmail(req.body);
      res.send(data);
    } catch (error) {
      logger.error(error);
      next();
    }
  };

  createUser = async (req, res, next) => {
    try {
      const data = await this.userService.addUser(req.body);
      res.status(httpStatus.CREATED);
      res.json(data);
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };
}

module.exports = UserController;
