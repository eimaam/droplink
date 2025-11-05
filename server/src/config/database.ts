import mongoose from 'mongoose';
import logger, { loggers } from '../utils/logger';
import { NodeEnv } from '@shared/types';
import { envConfig } from './env.config';


// MongoDB connection options
const options: mongoose.ConnectOptions = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

// Connect to MongoDB
export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(envConfig.MONGODB_URI, options);

    loggers.db.connected(envConfig.MONGODB_URI);

    // Log connection state changes
    mongoose.connection.on('disconnected', () => {
      loggers.db.disconnected();
    });
    
    mongoose.connection.on('error', (error: Error) => {
      loggers.db.error(error);
    });
    
    mongoose.connection.on('reconnected', () => {
      logger.info('📊 Database reconnected');
    });
    
  } catch (error) {
    loggers.db.error(error as Error);
    
    // Exit process in production if DB connection fails
    if (envConfig.NODE_ENVIRONMENT === NodeEnv.PRODUCTION) {
      logger.error('💥 Fatal: Unable to connect to database in production. Exiting...');
      process.exit(1);
    }
    
    throw error;
  }
};

// Graceful shutdown
export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
    loggers.db.disconnected();
  } catch (error) {
    loggers.db.error(error as Error);
    throw error;
  }
};

// Health check
export const isDatabaseConnected = (): boolean => {
  return mongoose.connection.readyState === 1;
};

export default { connectDatabase, disconnectDatabase, isDatabaseConnected };