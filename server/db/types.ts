import type {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from 'kysely';

export interface Database {
  users: UserTable
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
