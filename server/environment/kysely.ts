import type { Database } from '../db/types';
import process from 'node:process';
import SQLite from 'better-sqlite3';
import dotenv from 'dotenv';
import { Kysely, SqliteDialect } from 'kysely';

dotenv.config();

if (!process.env.SQLITE_PATH) {
  throw new Error('SQLITE_PATH environment variable is not set');
}

const dialect = new SqliteDialect({
  database: new SQLite(process.env.SQLITE_PATH),
});

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<Database>({
  dialect,
});
