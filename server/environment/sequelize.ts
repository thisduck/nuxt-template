import process from 'node:process';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

// Option 1: Passing a connection URI
export const sequelize = new Sequelize(process.env.DATABASE_URL || '');

async function authenticate() {
  try {
    await sequelize.authenticate();
    // eslint-disable-next-line no-console
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
}

authenticate();
