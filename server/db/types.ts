import type {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';

export interface Database {
  users: UserTable
  blog_posts: BlogPostTable
  comments: CommentTable
}

export interface UserTable {
  id: Generated<number>
  name: string
  email: string
  created_at: ColumnType<Date, string | undefined, never>
  updated_at: ColumnType<Date, string | undefined, never>
}

export type User = Selectable<UserTable>;
export type UserUpdate = Updateable<UserTable>;
export type UserInsert = Insertable<UserTable>;

export interface BlogPostTable {
  id: Generated<number>
  title: string
  body: string
  created_at: ColumnType<Date, string | undefined, never>
  updated_at: ColumnType<Date, string | undefined, never>
}

export type BlogPost = Selectable<BlogPostTable>;
export type BlogPostUpdate = Updateable<BlogPostTable>;
export type BlogPostInsert = Insertable<BlogPostTable>;

export interface CommentTable {
  id: Generated<number>
  blog_post_id: number
  name: string
  body: string
  created_at: ColumnType<Date, string | undefined, never>
  updated_at: ColumnType<Date, string | undefined, never>
}

export type Comment = Selectable<CommentTable>;
export type CommentUpdate = Updateable<CommentTable>;
export type CommentInsert = Insertable<CommentTable>;
