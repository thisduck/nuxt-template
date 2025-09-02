import type { Kysely } from 'kysely';
import type { Database } from '~/server/db/types';

// Example seed file for users table
// Rename to 02-users.ts and uncomment to use

/*
export async function seed(database: Kysely<Database>) {
  // Check if users already exist
  const existingUsers = await database
    .selectFrom('users')
    .select('id')
    .limit(1)
    .execute();

  if (existingUsers.length > 0) {
    console.warn('⚠️  Users already exist, skipping seed');
    return { skipped: true, count: 0 };
  }

  const users = [
    {
      email: 'admin@example.com',
      name: 'Admin User',
      role: 'admin',
      created_at: new Date().toISOString(),
    },
    {
      email: 'user@example.com', 
      name: 'Regular User',
      role: 'user',
      created_at: new Date().toISOString(),
    },
    {
      email: 'demo@example.com',
      name: 'Demo User',
      role: 'user',
      created_at: new Date().toISOString(),
    },
  ];

  await database.insertInto('users').values(users).execute();

  return { skipped: false, count: users.length };
}

export const metadata = {
  name: 'Users',
  description: 'Seeds sample users with different roles',
  order: 2,
};
*/