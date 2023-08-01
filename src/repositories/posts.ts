import { Post } from "@prisma/client";
import { CreatePostProps } from "../types/post";

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export const PostRepository = {
  async getAllPosts(): Promise<Post[] | []> {
    return prisma.post.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        title: true,
        id: true,
        createdAt: true,
        description: true
      },
    });
  },

  async getPostById(id: string) {
    return prisma.post.findUnique({
      where: { id },
    });
  },

  async createPost(data: CreatePostProps) {
    return prisma.post.create({
      data,
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

