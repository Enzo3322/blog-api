import { FastifyPluginAsync } from "fastify";
import { PostRepository } from "../repositories/posts";

const posts: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/posts', async (request, reply) => {
    try {
      const posts = await PostRepository.getAllPosts();
      reply.send(posts);
    } catch (error) {
      reply.status(500).send({ message: JSON.stringify(error) })

    }
  });

  fastify.get('/posts/:id', async (request, reply) => {
    try {
      const { id } = request.params as any;
      if (!id) return reply.status(404).send({ error: 'Post id must be provided' });

      const post = await PostRepository.getPostById(id);
      if (!post) {
        reply.status(404).send({ error: 'Post not found' });
      } else {
        reply.send(post);
      }
    } catch (error) {
      reply.status(500).send({ message: JSON.stringify(error) })

    }
  });

  fastify.post('/posts', async (request, reply) => {
    try {
      const { title, content } = request.body as any;

      if (!title || !content) return reply.status(400).send({ message: "title and content must be provided" })

      const newPost = await PostRepository.createPost({ title, content });
      reply.send(newPost);
    } catch (error) {
      reply.status(500).send({ message: JSON.stringify(error) })
    }
  });

  fastify.put('/posts/:id', async (request, reply) => {
    try {
      const { id } = request.params as any;
      const { title, content } = request.body as any;
      const updatedPost = await PostRepository.updatePost({ id, title, content });
      reply.send(updatedPost);
    } catch (error) {
      reply.status(500).send({ message: JSON.stringify(error) })

    }
  });

  fastify.delete('/posts/:id', async (request, reply) => {
    try {
      const { id } = request.params as any;
      await PostRepository.deletePost(id);
      reply.send({ message: 'Post deleted successfully' });
    } catch (error) {
      reply.status(500).send({ message: JSON.stringify(error) })

    }
  });
};

export default posts;
