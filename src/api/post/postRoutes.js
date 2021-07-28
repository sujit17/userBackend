const { container } = require("../../modules/bottle");
const { verifyToken } = require("../../helper/helper");

module.exports = (server) => {
  server.get("/post", verifyToken, container.PostController.getPosts);

  server.get("/post/:name", container.PostController.getPost);

  server.post("/post", container.PostController.createPost);

  server.put("/post", container.PostController.createPost);
};
