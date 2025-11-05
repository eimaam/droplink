import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import logger, { loggers, morganStream } from './utils/logger';
import { connectDatabase, disconnectDatabase } from './config/database';
import { NodeEnv } from '@shared/types';
import { responseHandler, sendError } from './utils/responseHandler';

const app: Application = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = (process.env.NODE_ENV as NodeEnv) || NodeEnv.DEVELOPMENT;

// Security middleware
app.use(helmet());

app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/v1/', limiter);

// HTTP request logging
app.use(morgan('combined', { stream: morganStream }));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: "🚀 Server is healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: NODE_ENV,
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'DropLink API Server',
    version: '1.0.0',
    documentation: '/api/docs',
  });
});

// TODO: Add your routes here
// app.use('/api/drops', dropRoutes);
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);

// 404 handler
app.use((req, res) => {
  loggers.request.error(req.method, req.url, new Error('Route not found'));
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested resource does not exist',
    path: req.url,
  });
});

// Global error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  loggers.request.error(req.method, req.url, err);
  
  sendError(
    {
        res,
        message: NODE_ENV === NodeEnv.DEVELOPMENT ? err.message : 'Something went wrong',
        statusCode: 500,
    ...(NODE_ENV === NodeEnv.DEVELOPMENT && { stack: err.stack }),
    }
  )

});

// Start server function
const startServer = async () => {
  try {
    // Connect to database
    await connectDatabase();
    
    // Start Express server
    app.listen(PORT, () => {
      loggers.server.started(Number(PORT), NODE_ENV);
      logger.info('✨ Available routes:');
      logger.info('   GET  /          - API info');
      logger.info('   GET  /health    - Health check');
    });
    
    // Graceful shutdown handlers
    const gracefulShutdown = async (signal: string) => {
      logger.info(`${signal} signal received: closing HTTP server`);
      
      // Close database connection
      await disconnectDatabase();
      
      loggers.server.stopped();
      logger.info('👋 Graceful shutdown completed');
      process.exit(0);
    };
    
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    
    // Handle uncaught errors (... though Winston already logs)
    process.on('uncaughtException', (error: Error) => {
      logger.error('💥 Uncaught Exception:', { error: error.message, stack: error.stack });
      // TODO: restart the process in PROD 
    });
    
    process.on('unhandledRejection', (reason: unknown, promise: Promise<unknown>) => {
      logger.error('💥 Unhandled Rejection at:', { promise, reason });
    });
    
  } catch (error) {
    loggers.server.error(error as Error);
    logger.error('💥 Failed to start server. Exiting...');
    process.exit(1);
  }
};

// Start the server
startServer();

export default app;
