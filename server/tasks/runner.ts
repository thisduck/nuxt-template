/* eslint-disable no-console */
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

function printUsage() {
  console.log('Usage: npm run task <file-name> <task-name> [task-args]');
}

async function runTask() {
  const currentDir = process.cwd();

  const args = process.argv.slice(2);

  const [fileName, taskName, ...taskArgs] = args;

  if (!fileName) {
    console.error('File name is required');
    printUsage();
    process.exit(1);
  }

  const file = path.resolve(currentDir, fileName);

  if (!fs.existsSync(file)) {
    console.error(`File not found: ${file}`);
    process.exit(1);
  }

  let tasks = await import(file);

  if (!tasks) {
    console.error(`No tasks found in file: ${file}`);
    process.exit(1);
  }

  if (tasks.default) {
    tasks = tasks.default;
  }

  if (!tasks[taskName]) {
    console.error(`Task not found: ${taskName}`);
    console.error('Available tasks:');
    console.error(Object.keys(tasks).join('\n'));
    process.exit(1);
  }

  const task = tasks[taskName];

  const resultOrPromise = task(...taskArgs);

  if (resultOrPromise instanceof Promise) {
    resultOrPromise.then((result) => {
      console.log('Task result:', result);
    });
  } else {
    console.log('Task result:', resultOrPromise);
  }
}

runTask();
