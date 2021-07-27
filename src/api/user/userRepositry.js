const User = require("./userModel");
const logger = require("../../utils/logger");
const APIError = require("../../utils/APIError");
const httpStatus = require("http-status");


class UserRepository {
  getAll = async () => {
    try {
      const result = await User.find({});
      return result;
    } catch (error) {
      logger.error("UserRepositry:getAll:error", error);
      throw new APIError({
        status: httpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  };

  findPostByEmail = async (emailPassword) => {
    try {
      const result = await User.findOne({ email: emailPassword.email });
      return result;
    } catch (error) {
      logger.error("UserRepositry:findPostByEmail:error", error);
      throw new APIError({
        status: httpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  };

  ceateUser = async (payload, password) => {
    const { name, email } = payload;
    try {
      const user = new User({
        name,
        email,
        password,
      });
      return await user.save();
    } catch (error) {
      logger.error("userRepositry:ceateUser:error", error);
      throw new APIError({
        status: httpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  };
}

module.exports = UserRepository;
