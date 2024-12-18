import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

export const DEVELOPMENT = process.env.NODE_ENV === 'development';
export const TEST = process.env.NODE_ENV === 'test';

export const MONGO_USER = process.env.MONGO_USER || '';
export const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
export const MONGO_URL = process.env.MONGO_URL || '';
export const MONGO_DATABASE = process.env.MONGO_DATABASE || '';
export const MOGO_OPTIONS: mongoose.ConnectOptions = { retryWrites: true, w: 'majority' };

export const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || 'localhost';
export const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 12345;

export const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

export const mongo = {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_URL,
    MONGO_DATABASE,
    MOGO_OPTIONS,
    MONGO_CONNECTION: `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_DATABASE}.${MONGO_URL}`
};

export const server = {
    SERVER_HOSTNAME,
    SERVER_PORT
};
