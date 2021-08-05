const Post = require("./postModel");
const logger = require("../../utils/logger");
const APIError = require("../../utils/APIError");
const httpStatus = require("http-status");

class PostRepositry {

  
  findAll = async () => {
    try {
      const result = await Post.find({});
      return result;
    } catch (error) {
      logger.error("PostRepositry:findAll:error", error);
      throw new APIError({
        status: httpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  };

  findPostByName = async (name) => {
    try {
      const result = await Post.findOne({ title: name });
      return result;
    } catch (error) {
      logger.error("postRepositry:findPostByName:error", error);
      throw new APIError({
        status: httpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  };

  ceateUser = async (payload) => {
    const { title, content } = payload;
    try {
      const post = new Post({
        title,
        content,
      });
      return await post.save();
    } catch (error) {
      logger.error("PostRepositry:findAll:error", error);
      throw new APIError({
        status: httpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  };
}
module.exports = PostRepositry;
