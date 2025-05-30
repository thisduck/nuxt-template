import type { Kysely } from 'kysely';
import { sql } from 'kysely';

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function up(db: Kysely<any>): Promise<void> {
  // up migration code goes here...
  // note: up migrations are mandatory. you must implement this function.
  // For more info, see: https://kysely.dev/docs/migrations

  await db.schema
    .createTable('users')
    .addColumn('id', 'integer', col => col.primaryKey().autoIncrement())
    .addColumn('name', 'varchar', col => col.notNull())
    .addColumn('email', 'varchar', col => col.notNull().unique())
    .addColumn('created_at', 'timestamp', col => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .addColumn('updated_at', 'timestamp', col => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .execute();
}

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function down(db: Kysely<any>): Promise<void> {
  // down migration code goes here...
  // note: down migrations are optional. you can safely delete this function.
  // For more info, see: https://kysely.dev/docs/migrations
  await db.schema.dropTable('users').execute();
}
