import request from 'supertest';
import mongoose, { Mongoose } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { application, Shutdown } from '../../src/server';

let mongoServer: MongoMemoryServer;

describe('User Routes', () => {
    beforeAll(async () => {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect(); // Close any existing connections
        }
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
        await Shutdown();
    });

    it('should create a user', async () => {
        const response = await request(application)
            .post('/api/auth/register')
            .send({
                role: 'distributor',
                name: 'syed ammar dis',
                email: 'dis2@gmail.com',
                password: '123456',
                contact: '1234567890',
                business_name: 'Techm',
                address: {
                    line1: '123 Main St',
                    city: 'Mumbai',
                    state: 'Maharashtra',
                    zipcode: '400001'
                },
                geolocation: { lat: 19.076, long: 72.8777 }
            });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('User created');
    });
});
