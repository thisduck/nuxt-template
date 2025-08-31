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
  getCategories: baseProcedure
    .query(() => {
      return [
        { id: 1, name: 'Electronics', description: 'Technology and gadgets' },
        { id: 2, name: 'Clothing', description: 'Fashion and apparel' },
        { id: 3, name: 'Shoes', description: 'Footwear and accessories' },
        { id: 4, name: 'Books', description: 'Literature and educational materials' },
        { id: 5, name: 'Sports', description: 'Athletic equipment and gear' },
        { id: 6, name: 'Home & Garden', description: 'Home improvement and gardening' },
        { id: 7, name: 'Automotive', description: 'Car parts and accessories' },
        { id: 8, name: 'Health & Beauty', description: 'Personal care products' },
      ];
    }),
  getFilteredProducts: baseProcedure
    .input(
      z.object({
        filter: z.string().optional(),
      }),
    )
    .query((opts) => {
      const products = [
        { id: 1, name: 'iPhone 15 Pro', category: 'Electronics', price: 999, stock: 45 },
        { id: 2, name: 'MacBook Pro', category: 'Electronics', price: 2499, stock: 23 },
        { id: 3, name: 'AirPods Pro', category: 'Electronics', price: 249, stock: 156 },
        { id: 4, name: 'iPad Air', category: 'Electronics', price: 599, stock: 67 },
        { id: 5, name: 'Apple Watch', category: 'Electronics', price: 399, stock: 89 },
        { id: 6, name: 'Nike Air Max', category: 'Shoes', price: 129, stock: 234 },
        { id: 7, name: 'Adidas Ultraboost', category: 'Shoes', price: 189, stock: 178 },
        { id: 8, name: 'Levi\'s 501 Jeans', category: 'Clothing', price: 89, stock: 145 },
        { id: 9, name: 'North Face Jacket', category: 'Clothing', price: 299, stock: 56 },
        { id: 10, name: 'Sony Headphones', category: 'Electronics', price: 199, stock: 112 },
        { id: 11, name: 'Samsung Galaxy S24', category: 'Electronics', price: 899, stock: 78 },
        { id: 12, name: 'Dell XPS 13', category: 'Electronics', price: 1299, stock: 34 },
        { id: 13, name: 'Beats Studio Buds', category: 'Electronics', price: 149, stock: 203 },
        { id: 14, name: 'Converse Chuck Taylor', category: 'Shoes', price: 65, stock: 289 },
        { id: 15, name: 'Patagonia Fleece', category: 'Clothing', price: 179, stock: 91 },
      ];

      if (!opts.input.filter?.trim()) {
        return products;
      }

      return products.filter(product =>
        product.name.toLowerCase().includes(opts.input.filter.toLowerCase()) ||
        product.category.toLowerCase().includes(opts.input.filter.toLowerCase())
      );
    }),
  getFilteredTags: baseProcedure
    .input(
      z.object({
        filter: z.string().optional(),
      }),
    )
    .query((opts) => {
      const tags = [
        { id: 1, name: 'React', category: 'Frontend', color: '#61DAFB' },
        { id: 2, name: 'Vue.js', category: 'Frontend', color: '#4FC08D' },
        { id: 3, name: 'Angular', category: 'Frontend', color: '#DD0031' },
        { id: 4, name: 'Svelte', category: 'Frontend', color: '#FF3E00' },
        { id: 5, name: 'Node.js', category: 'Backend', color: '#339933' },
        { id: 6, name: 'Express.js', category: 'Backend', color: '#000000' },
        { id: 7, name: 'Fastify', category: 'Backend', color: '#000000' },
        { id: 8, name: 'PostgreSQL', category: 'Database', color: '#336791' },
        { id: 9, name: 'MongoDB', category: 'Database', color: '#47A248' },
        { id: 10, name: 'Redis', category: 'Database', color: '#DC382D' },
        { id: 11, name: 'TypeScript', category: 'Language', color: '#3178C6' },
        { id: 12, name: 'JavaScript', category: 'Language', color: '#F7DF1E' },
        { id: 13, name: 'Python', category: 'Language', color: '#3776AB' },
        { id: 14, name: 'Docker', category: 'DevOps', color: '#2496ED' },
        { id: 15, name: 'Kubernetes', category: 'DevOps', color: '#326CE5' },
        { id: 16, name: 'AWS', category: 'Cloud', color: '#FF9900' },
        { id: 17, name: 'Azure', category: 'Cloud', color: '#0078D4' },
        { id: 18, name: 'GraphQL', category: 'API', color: '#E10098' },
        { id: 19, name: 'REST API', category: 'API', color: '#02569B' },
        { id: 20, name: 'tRPC', category: 'API', color: '#398CCB' },
      ];

      if (!opts.input.filter?.trim()) {
        return tags;
      }

      return tags.filter(tag =>
        tag.name.toLowerCase().includes(opts.input.filter.toLowerCase()) ||
        tag.category.toLowerCase().includes(opts.input.filter.toLowerCase())
      );
    }),
  getPriorities: baseProcedure
    .query(() => {
      return [
        { id: 1, name: 'Low', description: 'Not urgent, can be done later', color: '#10B981' },
        { id: 2, name: 'Medium', description: 'Important but not critical', color: '#F59E0B' },
        { id: 3, name: 'High', description: 'Needs attention soon', color: '#EF4444' },
        { id: 4, name: 'Critical', description: 'Urgent and important', color: '#DC2626' },
      ];
    }),
  getUserSettings: baseProcedure
    .query(() => {
      return {
        notifications: true,
        darkMode: false,
        autoSave: true,
        emailAlerts: false,
        soundEffects: true,
      };
    }),
  updateUserSettings: baseProcedure
    .input(
      z.object({
        notifications: z.boolean(),
        darkMode: z.boolean(),
        autoSave: z.boolean(),
        emailAlerts: z.boolean(),
        soundEffects: z.boolean(),
      }),
    )
    .mutation((opts) => {
      // In a real app, this would save to database
      console.log('Updating user settings:', opts.input);
      return { success: true, settings: opts.input };
    }),
  getProgrammingLanguages: baseProcedure
    .query(() => {
      return [
        { id: 1, name: 'JavaScript', category: 'Frontend', popularity: 95, icon: 'pi pi-code' },
        { id: 2, name: 'TypeScript', category: 'Frontend', popularity: 85, icon: 'pi pi-code' },
        { id: 3, name: 'Python', category: 'Backend', popularity: 90, icon: 'pi pi-server' },
        { id: 4, name: 'Java', category: 'Backend', popularity: 80, icon: 'pi pi-server' },
        { id: 5, name: 'Go', category: 'Backend', popularity: 70, icon: 'pi pi-server' },
        { id: 6, name: 'Rust', category: 'Systems', popularity: 65, icon: 'pi pi-cog' },
        { id: 7, name: 'PHP', category: 'Backend', popularity: 75, icon: 'pi pi-server' },
        { id: 8, name: 'C#', category: 'Backend', popularity: 78, icon: 'pi pi-server' },
      ];
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
