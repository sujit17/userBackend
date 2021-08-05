const PostService = require("./postService");
const PostController = require("./postController");
const PostRepository = require("./postRepositry");

module.exports = (bottle) => {
  bottle.service("PostRepository", PostRepository);
  bottle.service("PostService", PostService, "PostRepository");
  bottle.service("PostController", PostController, "PostService");
  return bottle;
};
