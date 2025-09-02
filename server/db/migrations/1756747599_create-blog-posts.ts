import type { Kysely } from 'kysely';
import { sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('blog_posts')
    .addColumn('id', 'integer', col =>
      col.primaryKey().autoIncrement().notNull())
    .addColumn('title', 'varchar(500)', col => col.notNull())
    .addColumn('body', 'text', col => col.notNull())
    .addColumn('created_at', 'datetime', col => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .addColumn('updated_at', 'datetime', col => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('blog_posts').execute();
}
