import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { db } from '~/server/environment/kysely';
import type { Database } from '~/server/db/types';
import type { Kysely } from 'kysely';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface SeedModule {
  seed: (db: Kysely<Database>) => Promise<{ skipped: boolean; count: number }>;
  metadata?: {
    name?: string;
    description?: string;
    order?: number;
  };
}

interface SeedResult {
  name: string;
  status: 'success' | 'skipped' | 'error';
  count?: number;
  error?: string;
  duration: number;
}

export async function runAllSeeds(): Promise<SeedResult[]> {
  const results: SeedResult[] = [];
  
  try {
    // Read all seed files
    const files = await fs.readdir(__dirname);
    const seedFiles = files
      .filter(f => f.endsWith('.ts') && f !== 'index.ts')
      .sort(); // Sort to ensure consistent order (01-, 02-, etc.)

    console.log(`\n🌱 Running ${seedFiles.length} seed file(s)...\n`);

    for (const file of seedFiles) {
      const seedPath = path.join(__dirname, file);
      const startTime = Date.now();
      
      try {
        // Dynamic import of seed module
        const module = await import(seedPath) as SeedModule;
        
        if (!module.seed || typeof module.seed !== 'function') {
          console.warn(`⚠️  ${file}: No seed function exported, skipping`);
          continue;
        }

        const seedName = module.metadata?.name || file.replace('.ts', '');
        console.log(`▶️  Running: ${seedName}`);
        
        if (module.metadata?.description) {
          console.log(`   ${module.metadata.description}`);
        }

        const result = await module.seed(db);
        const duration = Date.now() - startTime;

        if (result.skipped) {
          console.log(`⏭️  Skipped: ${seedName} (already seeded)\n`);
          results.push({
            name: seedName,
            status: 'skipped',
            duration,
          });
        } else {
          console.log(`✅ Success: ${seedName} - ${result.count} records inserted (${duration}ms)\n`);
          results.push({
            name: seedName,
            status: 'success',
            count: result.count,
            duration,
          });
        }
      } catch (error) {
        const duration = Date.now() - startTime;
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`❌ Error in ${file}: ${errorMessage}\n`);
        results.push({
          name: file,
          status: 'error',
          error: errorMessage,
          duration,
        });
      }
    }

    // Print summary
    console.log('\n📊 Seed Summary:');
    console.log('================');
    
    const successful = results.filter(r => r.status === 'success');
    const skipped = results.filter(r => r.status === 'skipped');
    const failed = results.filter(r => r.status === 'error');
    
    if (successful.length > 0) {
      console.log(`✅ Successful: ${successful.length}`);
      successful.forEach(r => {
        console.log(`   - ${r.name}: ${r.count} records (${r.duration}ms)`);
      });
    }
    
    if (skipped.length > 0) {
      console.log(`⏭️  Skipped: ${skipped.length}`);
      skipped.forEach(r => {
        console.log(`   - ${r.name}`);
      });
    }
    
    if (failed.length > 0) {
      console.log(`❌ Failed: ${failed.length}`);
      failed.forEach(r => {
        console.log(`   - ${r.name}: ${r.error}`);
      });
    }
    
    const totalDuration = results.reduce((sum, r) => sum + r.duration, 0);
    console.log(`\n⏱️  Total time: ${totalDuration}ms\n`);

  } catch (error) {
    console.error('Failed to run seeds:', error);
    throw error;
  }

  return results;
}

export async function runSeed(seedName: string): Promise<SeedResult> {
  const seedFile = seedName.endsWith('.ts') ? seedName : `${seedName}.ts`;
  const seedPath = path.join(__dirname, seedFile);
  const startTime = Date.now();
  
  try {
    const module = await import(seedPath) as SeedModule;
    
    if (!module.seed || typeof module.seed !== 'function') {
      throw new Error(`No seed function exported in ${seedFile}`);
    }

    const name = module.metadata?.name || seedName;
    console.log(`\n▶️  Running seed: ${name}`);
    
    if (module.metadata?.description) {
      console.log(`   ${module.metadata.description}`);
    }

    const result = await module.seed(db);
    const duration = Date.now() - startTime;

    if (result.skipped) {
      console.log(`⏭️  Skipped: ${name} (already seeded)\n`);
      return {
        name,
        status: 'skipped',
        duration,
      };
    } else {
      console.log(`✅ Success: ${name} - ${result.count} records inserted (${duration}ms)\n`);
      return {
        name,
        status: 'success',
        count: result.count,
        duration,
      };
    }
  } catch (error) {
    const duration = Date.now() - startTime;
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`❌ Error: ${errorMessage}\n`);
    return {
      name: seedName,
      status: 'error',
      error: errorMessage,
      duration,
    };
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const specificSeed = process.argv[2];
  
  if (specificSeed) {
    await runSeed(specificSeed);
  } else {
    await runAllSeeds();
  }
  
  await db.destroy();
}