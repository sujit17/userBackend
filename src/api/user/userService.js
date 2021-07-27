const httpStatus = require("http-status");
const APIError = require("../../utils/APIError");
const logger = require("../../utils/logger");

const { encryptPWD, comparePWD } = require("../../helper/helper");

class UserService {
  constructor(UserRepositry) {
    this.userRepositry = UserRepositry;
  }

  findAllUser = async () => {
    try {
      return await this.userRepositry.getAll();
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      logger.error("UserService:findAllUser:error", error);
      throw new APIError({
        status: httpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  };

  getUserByEmail = async (emailPassword) => {
    try {
      return await this.userRepositry.findPostByEmail(emailPassword);
      // const validPassword = comparePWD(emailPassword.password, user.password);
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      logger.error("userService:getUserByEmail:error", error);
      throw new APIError({
        status: httpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  };

  addUser = async (payload) => {
    const password = encryptPWD(payload.password);
    try {
      return await this.userRepositry.ceateUser(payload, password);
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      logger.error("userService:addUser:error", error);
      throw new APIError({
        status: httpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  };
}

module.exports = UserService;
