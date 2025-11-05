import dotenv from "dotenv";
dotenv.config();
import { NodeEnv } from "../../../shared/types/index.js";

const NODE_ENVIRONMENT = (process.env.NODE_ENV as NodeEnv) || NodeEnv.DEVELOPMENT;
const DEV_MONGODB_URI = process.env.DEV_MONGODB_URI || "mongodb://localhost:27017/droplink-dev";
const PROD_MONGODB_URI = process.env.PROD_MONGODB_URI || "mongodb://localhost:27017/droplink-prod";
const MONGODB_URI = NODE_ENVIRONMENT === NodeEnv.PRODUCTION  ? PROD_MONGODB_URI : DEV_MONGODB_URI;

// jwt
const jwt = {
  SECRET: process.env.JWT_SECRET || "your_jwt_secret",
  EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1h",
};

// app config export
const APP = {
    NAME: process.env.APP_NAME || "Droplink",
    PORT: process.env.APP_PORT || 4000,
    BASE_URL: process.env.APP_BASE_URL || `http://localhost:${process.env.APP_PORT || 4000}`,
    FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3000",
}





export const envConfig = {
  NODE_ENVIRONMENT,
  MONGODB_URI,
  JWT: jwt,
};