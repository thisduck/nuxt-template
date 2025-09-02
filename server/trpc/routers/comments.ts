import type { CommentInsert } from '~/server/db/types';
import { z } from 'zod';
import { db } from '~/server/environment/kysely';
import { baseProcedure, createTRPCRouter } from '~/server/trpc/init';

export const commentsRouter = createTRPCRouter({
  // Get comments for a blog post
  getByPostId: baseProcedure
    .input(z.object({
      blogPostId: z.number(),
    }))
    .query(async (opts) => {
      const comments = await db
        .selectFrom('comments')
        .selectAll()
        .where('blog_post_id', '=', opts.input.blogPostId)
        .orderBy('created_at', 'asc')
        .execute();

      return comments;
    }),

  // Add a comment to a blog post
  create: baseProcedure
    .input(z.object({
      blogPostId: z.number(),
      name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
      body: z.string().min(1, 'Comment is required').max(2000, 'Comment too long'),
    }))
    .mutation(async (opts) => {
      // Verify the blog post exists
      const post = await db
        .selectFrom('blog_posts')
        .select('id')
        .where('id', '=', opts.input.blogPostId)
        .executeTakeFirst();

      if (!post) {
        throw new Error('Blog post not found');
      }

      const commentData: CommentInsert = {
        blog_post_id: opts.input.blogPostId,
        name: opts.input.name,
        body: opts.input.body,
      };

      const newComment = await db
        .insertInto('comments')
        .values(commentData)
        .returningAll()
        .executeTakeFirstOrThrow();

      return newComment;
    }),

  // Get comment count for a blog post
  getCount: baseProcedure
    .input(z.object({
      blogPostId: z.number(),
    }))
    .query(async (opts) => {
      const result = await db
        .selectFrom('comments')
        .select(db.fn.count('id').as('count'))
        .where('blog_post_id', '=', opts.input.blogPostId)
        .executeTakeFirst();

      return Number(result?.count || 0);
    }),

  // Get recent comments across all blog posts (for admin/moderation)
  getRecent: baseProcedure
    .input(z.object({
      limit: z.number().min(1).max(50).default(10),
    }))
    .query(async (opts) => {
      const comments = await db
        .selectFrom('comments')
        .innerJoin('blog_posts', 'blog_posts.id', 'comments.blog_post_id')
        .select([
          'comments.id',
          'comments.name',
          'comments.body',
          'comments.created_at',
          'comments.blog_post_id',
          'blog_posts.title as post_title',
        ])
        .orderBy('comments.created_at', 'desc')
        .limit(opts.input.limit)
        .execute();

      return comments;
    }),
});