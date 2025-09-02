#!/usr/bin/env tsx
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Kysely, sql } from 'kysely';
import { db } from '../server/environment/kysely';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createBackup() {
  const dbPath = path.join(__dirname, '../server/db/app.db');
  const backupDir = path.join(__dirname, '../server/db/backups');
  
  // Create backups directory if it doesn't exist
  await fs.mkdir(backupDir, { recursive: true });
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(backupDir, `app-${timestamp}.db`);
  
  try {
    await fs.copyFile(dbPath, backupPath);
    console.log(`✅ Database backed up to: ${backupPath}`);
  } catch (error) {
    console.error('❌ Failed to create backup:', error);
    throw error;
  }
}

async function restoreBackup(backupFile?: string) {
  const dbPath = path.join(__dirname, '../server/db/app.db');
  const backupDir = path.join(__dirname, '../server/db/backups');
  
  if (!backupFile) {
    // Get latest backup
    const files = await fs.readdir(backupDir);
    const backups = files.filter(f => f.startsWith('app-') && f.endsWith('.db'));
    if (backups.length === 0) {
      console.error('❌ No backups found');
      return;
    }
    backupFile = backups.sort().pop()!;
  }
  
  const backupPath = path.join(backupDir, backupFile);
  
  try {
    await fs.copyFile(backupPath, dbPath);
    console.log(`✅ Database restored from: ${backupPath}`);
  } catch (error) {
    console.error('❌ Failed to restore backup:', error);
    throw error;
  }
}

async function listTables() {
  try {
    const tables = await sql<{ name: string }>`
      SELECT name FROM sqlite_master 
      WHERE type='table' 
      AND name NOT LIKE 'sqlite_%'
      AND name != 'kysely_migration'
      AND name != 'kysely_migration_lock'
      ORDER BY name
    `.execute(db);
    
    console.log('\n📊 Database Tables:');
    console.log('==================');
    
    for (const table of tables.rows) {
      const countResult = await sql<{ count: number }>`
        SELECT COUNT(*) as count FROM ${sql.ref(table.name)}
      `.execute(db);
      
      const count = countResult.rows[0]?.count || 0;
      console.log(`  • ${table.name}: ${count} rows`);
    }
    
    console.log('\n');
  } catch (error) {
    console.error('❌ Failed to list tables:', error);
    throw error;
  }
}

async function clearTable(tableName: string) {
  try {
    await sql`DELETE FROM ${sql.ref(tableName)}`.execute(db);
    console.log(`✅ Cleared table: ${tableName}`);
  } catch (error) {
    console.error(`❌ Failed to clear table ${tableName}:`, error);
    throw error;
  }
}

async function vacuum() {
  try {
    await sql`VACUUM`.execute(db);
    console.log('✅ Database vacuumed and optimized');
  } catch (error) {
    console.error('❌ Failed to vacuum database:', error);
    throw error;
  }
}

async function exportSchema() {
  try {
    const schema = await sql<{ sql: string }>`
      SELECT sql FROM sqlite_master 
      WHERE type IN ('table', 'index') 
      AND name NOT LIKE 'sqlite_%'
      ORDER BY type DESC, name
    `.execute(db);
    
    const schemaFile = path.join(__dirname, '../server/db/schema.sql');
    const schemaContent = schema.rows
      .map(row => row.sql)
      .filter(Boolean)
      .join(';\n\n') + ';';
    
    await fs.writeFile(schemaFile, schemaContent, 'utf-8');
    console.log(`✅ Schema exported to: ${schemaFile}`);
  } catch (error) {
    console.error('❌ Failed to export schema:', error);
    throw error;
  }
}

// Parse command line arguments
const command = process.argv[2];
const args = process.argv.slice(3);

async function main() {
  switch (command) {
    case 'backup':
      await createBackup();
      break;
    case 'restore':
      await restoreBackup(args[0]);
      break;
    case 'list':
      await listTables();
      break;
    case 'clear':
      if (!args[0]) {
        console.error('❌ Please specify a table name');
        process.exit(1);
      }
      await clearTable(args[0]);
      break;
    case 'vacuum':
      await vacuum();
      break;
    case 'schema':
      await exportSchema();
      break;
    default:
      console.log(`
Database Utilities
==================

Commands:
  backup              Create a backup of the database
  restore [file]      Restore from a backup (latest if no file specified)
  list                List all tables and row counts
  clear <table>       Clear all data from a specific table
  vacuum              Optimize the database
  schema              Export database schema to schema.sql

Examples:
  pnpm db:utils backup
  pnpm db:utils restore
  pnpm db:utils list
  pnpm db:utils clear blog_posts
  pnpm db:utils vacuum
  pnpm db:utils schema
      `);
  }
  
  await db.destroy();
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});