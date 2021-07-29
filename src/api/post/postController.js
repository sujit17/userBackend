const httpStatus = require("http-status");
const APIError = require("../../utils/APIError");
const logger = require("../../utils/logger");

class PostController {
  constructor(PostService, redisCon) {
    this.postService = PostService;
    this.redis = redisCon;
  }

  getPosts = async (req, res, next) => {
    try {
      const data = await this.postService.findAllPosts();
      res.json(data);
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };

  getPost = async (req, res, next) => {
    try {
      const { name } = req.params;
      const data = await this.postService.getPostByName(name);
      res.json(data);
    } catch (error) {
      logger.error(error);
      next();
    }
  };

  createPost = async (req, res, next) => {
    console.log("TOKEN", req.body);
    try {
      const data = await this.postService.addPost(req.body);
      res.status(httpStatus.CREATED);
      res.json(data);
    } catch (error) {
      next(error);
    }
  };

  updatePost = async (req, res, next) => {
    try {
      const { name } = req.params;
    } catch (error) {}
  };
}
module.exports = PostController;
