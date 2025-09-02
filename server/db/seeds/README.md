# Database Seeds

This directory contains database seed files that populate the database with sample data for development and testing.

## Usage

### Run all seeds
```bash
pnpm db:seed
```

### Run a specific seed
```bash
pnpm db:seed:specific 01-blog-posts
# or
pnpm db:seed:specific blog-posts
```

### Reset database and seed
```bash
pnpm db:reset
```

## Creating a New Seed File

1. Create a new TypeScript file in this directory with a numeric prefix for ordering:
   ```
   03-products.ts
   ```

2. Export a `seed` function and optional `metadata`:
   ```typescript
   import type { Kysely } from 'kysely';
   import type { Database } from '~/server/db/types';

   export async function seed(database: Kysely<Database>) {
     // Check if data already exists
     const existing = await database
       .selectFrom('your_table')
       .select('id')
       .limit(1)
       .execute();

     if (existing.length > 0) {
       return { skipped: true, count: 0 };
     }

     // Insert your data
     const data = [/* your data */];
     await database.insertInto('your_table').values(data).execute();

     return { skipped: false, count: data.length };
   }

   export const metadata = {
     name: 'Friendly Name',
     description: 'What this seed does',
     order: 3, // Optional: override file order
   };
   ```

## Conventions

- **File naming**: Use numeric prefixes (01-, 02-, etc.) to control execution order
- **Idempotency**: Seeds should check if data exists and skip if already seeded
- **Return values**: Always return `{ skipped: boolean, count: number }`
- **Error handling**: The runner will catch and report errors automatically
- **Example files**: Files ending with `.example.ts` are ignored by the runner

## Seed Files

| File | Description | Records |
|------|-------------|---------|
| 01-blog-posts.ts | Sample blog posts with rich content | 50 |
| 02-users.example.ts | Example user seed (disabled) | - |

## Tips

- Seeds run in alphabetical order (use numeric prefixes to control)
- Each seed should be idempotent (safe to run multiple times)
- Use `db:reset` to clear and reseed the database
- Check seed status with `db:list` to see record counts