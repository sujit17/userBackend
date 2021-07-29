const APIError = require("../../utils/APIError");
const logger = require("../../utils/logger");
const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");

const { encryptPWD, comparePWD } = require("../../helper/helper");

const JWT_SECRET = "dhsudhs||$#@&^!*()ofjodkas jktg67e9122330ij*())&*^$@!";

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
      if (!data) {
        res.json({ status: false });
      } else {
        let validPassword = comparePWD(req.body.password, data.password);
        if (validPassword) {
          const token = jwt.sign(
            {
              id: data._id,
              email: data.email,
            },
            JWT_SECRET
          );
          res.json({ status: true, JWT: token });
        } else {
          res.json({ status: false });
        }
      }
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
