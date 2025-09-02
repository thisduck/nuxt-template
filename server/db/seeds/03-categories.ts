import type { Kysely } from 'kysely';
import type { Database } from '~/server/db/types';

export async function seed(database: Kysely<Database>) {
  // For demo purposes, let's just log what we would do
  // In a real scenario, you'd insert into a categories table
  
  console.log('   📁 Would insert categories: Tech, Lifestyle, Business, Travel');
  console.log('   📊 Simulating database insertion...');
  
  // Simulate some work
  await new Promise(resolve => setTimeout(resolve, 10));
  
  const categories = [
    { name: 'Technology', slug: 'tech' },
    { name: 'Lifestyle', slug: 'lifestyle' },
    { name: 'Business', slug: 'business' },
    { name: 'Travel', slug: 'travel' },
  ];
  
  // In real implementation:
  // await database.insertInto('categories').values(categories).execute();
  
  return { skipped: false, count: categories.length };
}

export const metadata = {
  name: 'Categories',
  description: 'Seeds blog post categories',
  order: 3,
};