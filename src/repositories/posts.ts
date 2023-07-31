const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export const PostRepository = {
  async getAllPosts() {
    return prisma.post.findMany({
      select: {
        title: true,
        id: true,
        createdAt: true
      },
    });
  },

  async getPostById(id: string) {
    return prisma.post.findUnique({
      where: { id },
    });
  },

  async createPost({ title, content }: { title: string, content: string }) {
    return prisma.post.create({
      data: {
        title,
        content,
      },
    });
  },

  async updatePost({ id, title, content }: { id: string, title: string, content: string }) {
    return prisma.post.update({
      where: { id },
      data: {
        title,
        content,
      },
    });
  },

  async deletePost(id: string) {
    return prisma.post.delete({
      where: { id },
    });
  },
};

