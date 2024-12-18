import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { application, Shutdown } from '../../src/server';
import mongoose from 'mongoose';

let mongoServer: MongoMemoryServer;

describe('Application', () => {
    beforeAll(async () => {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect(); // Close any existing connections
        }
        mongoServer = await MongoMemoryServer.create(); // Start in-memory MongoDB server
        const uri = mongoServer.getUri();
        await mongoose.connect(uri); // Connect to the in-memory MongoDB
    });

    afterAll(async () => {
        await mongoose.disconnect(); // Disconnect Mongoose instance
        await mongoServer.stop(); // Stop the in-memory MongoDB server
        await Shutdown();
    });

    it('Starts and has the proper test environment', async () => {
        expect(process.env.NODE_ENV).toBe('test');
        expect(application).toBeDefined();
    }, 10000);

    it('Returns all options allowed when called from the HTTP method options', async () => {
        const response = await request(application).options('/');

        expect(response.status).toBe(200);
        expect(response.headers['access-control-allow-methods']).toBe('PUT, POST, PATCH, DELETE, GET');
    }, 10000);

    it('Returns 404 when the route requested is not found.', async () => {
        const response = await request(application).get('/a/cute/route/that/does/not/exist/');

        expect(response.status).toBe(404);
    });
});
