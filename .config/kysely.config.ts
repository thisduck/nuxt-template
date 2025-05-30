import process from 'node:process';
import database from 'better-sqlite3';
import dotenv from 'dotenv';
import { defineConfig } from 'kysely-ctl';

dotenv.config();

if (!process.env.SQLITE_PATH) {
  throw new Error('SQLITE_PATH environment variable is not set');
}

console.log('Using SQLite database at:', process.env.SQLITE_PATH);

export default defineConfig({
  // replace me with a real dialect instance OR a dialect name + `dialectConfig` prop.
  dialect: 'better-sqlite3',
  dialectConfig: {
    database: database(process.env.SQLITE_PATH),
  },

  migrations: {
    migrationFolder: './server/db/migrations',
  },
  //   plugins: [],
  //   seeds: {
  //     seedFolder: "seeds",
  //   }
});
