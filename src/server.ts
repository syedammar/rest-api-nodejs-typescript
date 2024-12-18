import http from 'http';
import express from 'express';
import mongoose, { ConnectOptions, Mongoose } from 'mongoose';
import './config/logging';
import { corsHandler } from './middleware/corsHandler';
import { loggingHandler } from './middleware/loggingHandler';
import { routeNotFound } from './middleware/routeNotFound';
import { server, mongo } from './config/config';
import userRouter from './routes/user.routes';
import authRouter from './routes/auth.routes';
export const application = express();
export let httpServer: ReturnType<typeof http.createServer>;

let isConnected = false;

export const connectToDatabase = async (uri: string, options: ConnectOptions) => {
    if (isConnected) {
        console.log('Using existing connection');
        return mongoose.connection;
    }

    const connection = await mongoose.connect(uri, options);
    isConnected = true;
    logging.log('Connected to db');
    ('Database connected');
    return connection;
};

export const Main = async () => {
    logging.log('----------------------------------------');
    logging.log('Initializing API');
    logging.log('----------------------------------------');
    application.use(express.urlencoded({ extended: true }));
    application.use(express.json());

    logging.log('----------------------------------------');
    logging.log('Connect to DB');
    logging.log('----------------------------------------');

    try {
        logging.log('MONGO_CONNECTION: ', mongo.MONGO_CONNECTION);
        connectToDatabase(mongo.MONGO_CONNECTION, mongo.MOGO_OPTIONS);
        //await mongoose.connect(mongo.MONGO_CONNECTION, mongo.MOGO_OPTIONS);
        // logging.log('----------------------------------------');
        // logging.log('Connected to db');
        // logging.log('----------------------------------------');
    } catch (error) {
        logging.log('----------------------------------------');
        logging.log('Unable to connect to db');
        logging.error(error);
        logging.log('----------------------------------------');
    }

    logging.log('----------------------------------------');
    logging.log('Logging & Configuration');
    logging.log('----------------------------------------');
    application.use(loggingHandler);
    application.use(corsHandler);

    logging.log('----------------------------------------');
    logging.log('Define Controller Routing');
    logging.log('----------------------------------------');
    application.get('/main/healthcheck', (req, res, next) => {
        return res.status(200).json({ hello: 'world!' });
    });

    application.use('/api/users', userRouter);
    application.use('/api/auth', authRouter);

    logging.log('----------------------------------------');
    logging.log('Define Routing Error');
    logging.log('----------------------------------------');
    application.use(routeNotFound);

    logging.log('----------------------------------------');
    logging.log('Starting Server');
    logging.log('----------------------------------------');
    httpServer = http.createServer(application);
    httpServer.listen(server.SERVER_PORT, () => {
        logging.log('----------------------------------------');
        logging.log(`Server started on ${server.SERVER_HOSTNAME}:${server.SERVER_PORT}`);
        logging.log('----------------------------------------');
    });
};

//export const Shutdown = (callback: any) => httpServer && httpServer.close(callback);
export const Shutdown = () => {
    return new Promise((resolve, reject) => {
        if (httpServer) {
            httpServer.close((err) => {
                if (err) return reject(err);
                resolve(true);
            });
        } else {
            resolve(true);
        }
    });
};

Main();
