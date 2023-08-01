import { FastifyPluginAsync } from "fastify";
import { createPost, deletePost, getFeedPosts, getPostById, getPosts, searchPostsByTerm, updatePost } from "../controllers/post.controllers";

const posts: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/posts', getPosts);

  fastify.get('/posts/:id', getPostById);

  fastify.get('/posts/feed', getFeedPosts);

  fastify.get('/posts/search', searchPostsByTerm);

  fastify.post('/posts', createPost);

  fastify.put('/posts/:id', updatePost);

  fastify.delete('/posts/:id', deletePost);
};

export default posts;
