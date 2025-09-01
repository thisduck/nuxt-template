import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '~/server/trpc/init';
import { db } from '~/server/environment/kysely';
import type { BlogPostInsert } from '~/server/db/types';

export const blogRouter = createTRPCRouter({
  // Create a new blog post
  createPost: baseProcedure
    .input(z.object({
      title: z.string().min(1, 'Title is required'),
      body: z.string().min(1, 'Body is required'),
    }))
    .mutation(async (opts) => {
      const postData: BlogPostInsert = {
        title: opts.input.title,
        body: opts.input.body,
      };

      const newPost = await db
        .insertInto('blog_posts')
        .values(postData)
        .returningAll()
        .executeTakeFirstOrThrow();

      return newPost;
    }),

  // Get all blog posts
  getPosts: baseProcedure
    .query(async () => {
      const posts = await db
        .selectFrom('blog_posts')
        .selectAll()
        .orderBy('created_at', 'desc')
        .execute();

      return posts;
    }),

  // Get a single blog post by ID
  getPost: baseProcedure
    .input(z.object({
      id: z.number(),
    }))
    .query(async (opts) => {
      const post = await db
        .selectFrom('blog_posts')
        .selectAll()
        .where('id', '=', opts.input.id)
        .executeTakeFirst();

      if (!post) {
        throw new Error('Blog post not found');
      }

      return post;
    }),
});