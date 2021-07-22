const { container } = require("../../modules/bottle");

module.exports = (server) => {
  server.get("/post", container.PostController.getPosts);

  server.get("/post/:name", container.PostController.getPost);

  server.post("/post", container.PostController.createPost);

  server.put("/post", container.PostController.createPost);
};
