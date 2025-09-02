import type { BlogPostInsert } from '~/server/db/types';
import { z } from 'zod';
import { db } from '~/server/environment/kysely';
import { baseProcedure, createTRPCRouter } from '~/server/trpc/init';

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

  // Get all blog posts with pagination
  getPosts: baseProcedure
    .input(z.object({
      page: z.number().min(0).default(0),
      pageSize: z.number().min(1).max(50).default(8),
    }))
    .query(async (opts) => {
      const { page, pageSize } = opts.input;
      const offset = page * pageSize;

      // Get total count
      const totalResult = await db
        .selectFrom('blog_posts')
        .select(db.fn.count('id').as('count'))
        .executeTakeFirst();

      const total = Number(totalResult?.count || 0);

      // Get paginated posts
      const posts = await db
        .selectFrom('blog_posts')
        .selectAll()
        .orderBy('created_at', 'desc')
        .limit(pageSize)
        .offset(offset)
        .execute();

      return {
        posts,
        pagination: {
          page,
          pageSize,
          total,
          totalPages: Math.ceil(total / pageSize),
        },
      };
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

  // Search blog posts
  searchPosts: baseProcedure
    .input(z.object({
      query: z.string().min(1, 'Search query is required'),
      page: z.number().min(0).default(0),
      pageSize: z.number().min(1).max(50).default(8),
    }))
    .query(async (opts) => {
      const { query, page, pageSize } = opts.input;
      const offset = page * pageSize;

      // Search in title and body using LIKE with wildcards
      const searchPattern = `%${query}%`;

      // Get total count of matching posts
      const totalResult = await db
        .selectFrom('blog_posts')
        .select(db.fn.count('id').as('count'))
        .where(eb => eb.or([
          eb('title', 'like', searchPattern),
          eb('body', 'like', searchPattern),
        ]))
        .executeTakeFirst();

      const total = Number(totalResult?.count || 0);

      // Get paginated search results
      const posts = await db
        .selectFrom('blog_posts')
        .selectAll()
        .where(eb => eb.or([
          eb('title', 'like', searchPattern),
          eb('body', 'like', searchPattern),
        ]))
        .orderBy('created_at', 'desc')
        .limit(pageSize)
        .offset(offset)
        .execute();

      return {
        posts,
        pagination: {
          page,
          pageSize,
          total,
          totalPages: Math.ceil(total / pageSize),
        },
        query,
      };
    }),
});
