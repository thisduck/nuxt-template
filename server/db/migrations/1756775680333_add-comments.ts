import type { Kysely } from 'kysely';
import { sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('comments')
    .addColumn('id', 'integer', col =>
      col.primaryKey().autoIncrement().notNull())
    .addColumn('blog_post_id', 'integer', col => 
      col.notNull().references('blog_posts.id').onDelete('cascade'))
    .addColumn('name', 'varchar(100)', col => col.notNull())
    .addColumn('body', 'text', col => col.notNull())
    .addColumn('created_at', 'datetime', col => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .addColumn('updated_at', 'datetime', col => col.notNull().defaultTo(sql`CURRENT_TIMESTAMP`))
    .execute();

  // Create index for faster blog post comment lookups
  await db.schema
    .createIndex('idx_comments_blog_post_id')
    .on('comments')
    .column('blog_post_id')
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('comments').execute();
}
