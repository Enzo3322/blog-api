import { FastifyReply, FastifyRequest } from "fastify";
import { PostRepository } from "../repositories/posts";
import { PostNotFound } from "../errors/PostNotFound";
import { CreatePostProps } from "../types/post";

export const getPosts = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const posts = await PostRepository.getAllPosts();

        if (!posts.length) throw new PostNotFound()

        return reply.send(posts);
    } catch (error) {
        if (error instanceof PostNotFound) {
            return reply.status(500).send({ message: error.message })
        }
        return reply.status(500).send({ message: JSON.stringify(error) })
    }
}
export const getFeedPosts = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const posts = await PostRepository.getAllPosts();

        if (!posts.length) throw new PostNotFound()
        const feedPosts = posts.slice(0, 3)
        return reply.send(feedPosts);
    } catch (error) {
        if (error instanceof PostNotFound) {
            return reply.status(500).send({ message: error.message })
        }
        return reply.status(500).send({ message: JSON.stringify(error) })
    }
}
export const getPostById = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { id } = request.params as any;

        if (!id) return reply.status(404).send({ error: 'Post id must be provided' });

        const post = await PostRepository.getPostById(id);

        if (!post) throw new PostNotFound()

        return reply.send(post);

    } catch (error) {
        if (error instanceof PostNotFound) {
            return reply.status(500).send({ message: error.message })
        }
        return reply.status(500).send({ message: JSON.stringify(error) })

    }
}
export const createPost = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { title, content, category, description, labels, related } = request.body as CreatePostProps;

        if (!title || !content || !category || !description) return reply.status(400).send({ message: "mandatory fields must be provided" })

        const newPost = await PostRepository.createPost({ title, content, category, description, labels, related });

        return reply.send(newPost);
    } catch (error) {
        return reply.status(500).send({ message: JSON.stringify(error) })
    }
}
export const updatePost = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { id } = request.params as any;

        const { title, content } = request.body as any;

        if (!title || !content) return reply.status(400).send({ message: 'title and content must be provided' })

        const updatedPost = await PostRepository.updatePost({ id, title, content });

        return reply.send(updatedPost);
    } catch (error) {
        return reply.status(500).send({ message: JSON.stringify(error) })

    }
}
export const deletePost = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { id } = request.params as any;

        if (!id) return reply.status(400).send({ message: 'post id must be provided' })

        const deleted = await PostRepository.deletePost(id);

        if (!deleted) return reply.status(400).send({ message: 'post id not exists' })

        return reply.send({ message: 'Post deleted successfully' });

    } catch (error) {
        return reply.status(500).send({ message: JSON.stringify(error) })

    }
}
export const searchPostsByTerm = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { term } = request.query as any;

        if (!term || typeof term !== 'string') {
            return reply.status(400).send({ message: 'Search term must be provided as a string' });
        }

        const posts = await PostRepository.getAllPosts();
        const matchedPosts = posts.filter(post => {
            return (
                post.title.includes(term) ||
                post.content.includes(term) ||
                post.description.includes(term) ||
                post.labels.includes(term) ||
                post.related.includes(term)
            );
        });

        if (!matchedPosts.length) {
            return reply.status(404).send({ message: 'No posts found matching the search term' });
        }

        return reply.send(matchedPosts);
    } catch (error) {
        return reply.status(500).send({ message: JSON.stringify(error) });
    }
};
