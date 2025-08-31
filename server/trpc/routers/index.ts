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
        page: z.number().min(0).default(0),
        size: z.number().min(1).max(100).default(10),
        sortField: z.string().optional(),
        sortOrder: z.number().optional(), // 1 for asc, -1 for desc
      }),
    )
    .query((opts) => {
      // Extended product list with 50+ items
      const allProducts = [
        // Electronics
        { id: 1, name: 'iPhone 15 Pro', category: 'Electronics', price: 999, stock: 45, brand: 'Apple' },
        { id: 2, name: 'MacBook Pro', category: 'Electronics', price: 2499, stock: 23, brand: 'Apple' },
        { id: 3, name: 'AirPods Pro', category: 'Electronics', price: 249, stock: 156, brand: 'Apple' },
        { id: 4, name: 'iPad Air', category: 'Electronics', price: 599, stock: 67, brand: 'Apple' },
        { id: 5, name: 'Apple Watch', category: 'Electronics', price: 399, stock: 89, brand: 'Apple' },
        { id: 10, name: 'Sony Headphones', category: 'Electronics', price: 199, stock: 112, brand: 'Sony' },
        { id: 11, name: 'Samsung Galaxy S24', category: 'Electronics', price: 899, stock: 78, brand: 'Samsung' },
        { id: 12, name: 'Dell XPS 13', category: 'Electronics', price: 1299, stock: 34, brand: 'Dell' },
        { id: 13, name: 'Beats Studio Buds', category: 'Electronics', price: 149, stock: 203, brand: 'Beats' },
        { id: 16, name: 'Microsoft Surface Pro', category: 'Electronics', price: 1099, stock: 41, brand: 'Microsoft' },
        { id: 17, name: 'Nintendo Switch', category: 'Electronics', price: 299, stock: 167, brand: 'Nintendo' },
        { id: 18, name: 'PlayStation 5', category: 'Electronics', price: 499, stock: 12, brand: 'Sony' },
        { id: 19, name: 'Xbox Series X', category: 'Electronics', price: 499, stock: 8, brand: 'Microsoft' },
        { id: 20, name: 'Google Pixel 8', category: 'Electronics', price: 699, stock: 93, brand: 'Google' },
        { id: 21, name: 'LG OLED TV 55"', category: 'Electronics', price: 1499, stock: 15, brand: 'LG' },
        { id: 22, name: 'Samsung 4K Monitor', category: 'Electronics', price: 349, stock: 87, brand: 'Samsung' },
        { id: 23, name: 'Logitech MX Master 3', category: 'Electronics', price: 99, stock: 134, brand: 'Logitech' },
        { id: 24, name: 'Canon EOS R5', category: 'Electronics', price: 3899, stock: 7, brand: 'Canon' },
        { id: 25, name: 'Nikon D850', category: 'Electronics', price: 2999, stock: 11, brand: 'Nikon' },
        { id: 26, name: 'DJI Mini 3 Pro', category: 'Electronics', price: 759, stock: 44, brand: 'DJI' },

        // Shoes  
        { id: 6, name: 'Nike Air Max', category: 'Shoes', price: 129, stock: 234, brand: 'Nike' },
        { id: 7, name: 'Adidas Ultraboost', category: 'Shoes', price: 189, stock: 178, brand: 'Adidas' },
        { id: 14, name: 'Converse Chuck Taylor', category: 'Shoes', price: 65, stock: 289, brand: 'Converse' },
        { id: 27, name: 'Jordan Air 1', category: 'Shoes', price: 170, stock: 87, brand: 'Nike' },
        { id: 28, name: 'Vans Old Skool', category: 'Shoes', price: 60, stock: 203, brand: 'Vans' },
        { id: 29, name: 'New Balance 990', category: 'Shoes', price: 185, stock: 76, brand: 'New Balance' },
        { id: 30, name: 'Puma RS-X', category: 'Shoes', price: 110, stock: 145, brand: 'Puma' },
        { id: 31, name: 'Reebok Classic', category: 'Shoes', price: 75, stock: 198, brand: 'Reebok' },
        { id: 32, name: 'Dr. Martens 1460', category: 'Shoes', price: 170, stock: 56, brand: 'Dr. Martens' },
        { id: 33, name: 'Timberland Boots', category: 'Shoes', price: 190, stock: 89, brand: 'Timberland' },

        // Clothing
        { id: 8, name: 'Levi\'s 501 Jeans', category: 'Clothing', price: 89, stock: 145, brand: 'Levi\'s' },
        { id: 9, name: 'North Face Jacket', category: 'Clothing', price: 299, stock: 56, brand: 'The North Face' },
        { id: 15, name: 'Patagonia Fleece', category: 'Clothing', price: 179, stock: 91, brand: 'Patagonia' },
        { id: 34, name: 'Nike Hoodie', category: 'Clothing', price: 65, stock: 234, brand: 'Nike' },
        { id: 35, name: 'Adidas Track Pants', category: 'Clothing', price: 55, stock: 187, brand: 'Adidas' },
        { id: 36, name: 'Champion Sweatshirt', category: 'Clothing', price: 45, stock: 156, brand: 'Champion' },
        { id: 37, name: 'Ralph Lauren Polo', category: 'Clothing', price: 89, stock: 98, brand: 'Ralph Lauren' },
        { id: 38, name: 'Tommy Hilfiger Shirt', category: 'Clothing', price: 79, stock: 134, brand: 'Tommy Hilfiger' },
        { id: 39, name: 'Calvin Klein Jeans', category: 'Clothing', price: 99, stock: 78, brand: 'Calvin Klein' },
        { id: 40, name: 'Under Armour T-Shirt', category: 'Clothing', price: 29, stock: 267, brand: 'Under Armour' },

        // Books
        { id: 41, name: 'The Great Gatsby', category: 'Books', price: 12, stock: 89, brand: 'Scribner' },
        { id: 42, name: '1984', category: 'Books', price: 13, stock: 156, brand: 'Penguin' },
        { id: 43, name: 'To Kill a Mockingbird', category: 'Books', price: 14, stock: 123, brand: 'Harper Lee' },
        { id: 44, name: 'Pride and Prejudice', category: 'Books', price: 11, stock: 98, brand: 'Penguin Classics' },
        { id: 45, name: 'The Catcher in the Rye', category: 'Books', price: 13, stock: 145, brand: 'Little, Brown' },
        { id: 46, name: 'Lord of the Flies', category: 'Books', price: 12, stock: 167, brand: 'Faber & Faber' },
        { id: 47, name: 'Animal Farm', category: 'Books', price: 10, stock: 234, brand: 'Penguin' },
        { id: 48, name: 'Brave New World', category: 'Books', price: 14, stock: 87, brand: 'Harper Perennial' },

        // Sports
        { id: 49, name: 'Wilson Tennis Racket', category: 'Sports', price: 149, stock: 67, brand: 'Wilson' },
        { id: 50, name: 'Spalding Basketball', category: 'Sports', price: 29, stock: 189, brand: 'Spalding' },
        { id: 51, name: 'Nike Soccer Ball', category: 'Sports', price: 35, stock: 156, brand: 'Nike' },
        { id: 52, name: 'Yeti Cooler 30Qt', category: 'Sports', price: 299, stock: 34, brand: 'Yeti' },
        { id: 53, name: 'Coleman Tent 4-Person', category: 'Sports', price: 149, stock: 45, brand: 'Coleman' },
      ];

      let filteredProducts = allProducts;

      // Apply text filter
      if (opts.input.filter?.trim()) {
        filteredProducts = allProducts.filter(product =>
          product.name.toLowerCase().includes(opts.input.filter.toLowerCase()) ||
          product.category.toLowerCase().includes(opts.input.filter.toLowerCase()) ||
          product.brand.toLowerCase().includes(opts.input.filter.toLowerCase())
        );
      }

      // Apply sorting
      if (opts.input.sortField && opts.input.sortOrder) {
        filteredProducts = [...filteredProducts].sort((a, b) => {
          const field = opts.input.sortField!;
          const aVal = a[field as keyof typeof a];
          const bVal = b[field as keyof typeof b];
          
          let comparison = 0;
          if (aVal < bVal) comparison = -1;
          if (aVal > bVal) comparison = 1;
          
          return opts.input.sortOrder === 1 ? comparison : -comparison;
        });
      }

      // Calculate pagination
      const totalRecords = filteredProducts.length;
      const startIndex = opts.input.page * opts.input.size;
      const endIndex = startIndex + opts.input.size;
      const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

      return {
        data: paginatedProducts,
        totalRecords,
        page: opts.input.page,
        size: opts.input.size
      };
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
