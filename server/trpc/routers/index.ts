import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '~/server/trpc/init';

export const appRouter = createTRPCRouter({
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
  searchProducts: baseProcedure
    .input(
      z.object({
        query: z.string(),
      }),
    )
    .query((opts) => {
      const products = [
        { id: 1, name: 'iPhone 15 Pro', category: 'Electronics', price: 999 },
        { id: 2, name: 'MacBook Pro', category: 'Electronics', price: 2499 },
        { id: 3, name: 'AirPods Pro', category: 'Electronics', price: 249 },
        { id: 4, name: 'iPad Air', category: 'Electronics', price: 599 },
        { id: 5, name: 'Apple Watch', category: 'Electronics', price: 399 },
        { id: 6, name: 'Nike Air Max', category: 'Shoes', price: 129 },
        { id: 7, name: 'Adidas Ultraboost', category: 'Shoes', price: 189 },
        { id: 8, name: 'Levi\'s 501 Jeans', category: 'Clothing', price: 89 },
        { id: 9, name: 'North Face Jacket', category: 'Clothing', price: 299 },
        { id: 10, name: 'Sony Headphones', category: 'Electronics', price: 199 },
      ];

      if (!opts.input.query.trim()) {
        return products.slice(0, 5);
      }

      return products.filter(product =>
        product.name.toLowerCase().includes(opts.input.query.toLowerCase()) ||
        product.category.toLowerCase().includes(opts.input.query.toLowerCase())
      );
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
