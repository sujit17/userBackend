const httpStatus = require("http-status");
const APIError = require("../../utils/APIError");
const logger = require("../../utils/logger");

class PostService {
  constructor(PostRepositry) {
    this.postRepositry = PostRepositry;
  }

  findAllPosts = async () => {
    try {
      return await this.postRepositry.findAll();
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      logger.error("postService:getAllpost:error", error);
      throw new APIError({
        status: httpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  };

  getPostByName = async (name) => {
    try {
      return await this.postRepositry.findPostByName(name);
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      logger.error("postService:getPostByName:error", error);
      throw new APIError({
        status: httpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  };

  addPost = async (payload) => {
    try {
      return await this.postRepositry.ceateUser(payload);
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      logger.error("PostService:addPost:error", error);
      throw new APIError({
        status: httpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  };
}

module.exports = PostService;
