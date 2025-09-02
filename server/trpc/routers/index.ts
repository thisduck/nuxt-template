import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '~/server/trpc/init';
import { blogRouter } from './blog';
import { examplesRouter } from './examples';

export const appRouter = createTRPCRouter({
  blog: blogRouter,
  examples: examplesRouter,
  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
