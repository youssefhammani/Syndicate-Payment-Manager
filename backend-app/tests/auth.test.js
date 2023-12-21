// FILEPATH: /home/yhammani/My Coding Vault/Syndicate-Payment-Manager/backend-app/tests/clientController.test.js

const request = require('supertest');
const express = require('express');
const app = express();
const { createClient, getAllClients, getClientById } = require('../src/controllers/clientController');
const Client = require('../src/models/Client');

jest.mock('../src/models/Client.js');

app.post('/clients', createClient);
app.get('/clients', getAllClients);
app.get('/clients/:id', getClientById);


describe('createClient function', () => {
    console.error = jest.fn();
    it('should create a new client', async () => {
        const mockClient = { _id: 'client123', name: 'Test Client' };
        Client.create.mockResolvedValue(mockClient);

        const res = await request(app)
            .post('/clients')
            .send({ name: 'Test Client' });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual(mockClient);
    });

    it('should return 500 if an error is thrown', async () => {
        Client.create.mockRejectedValue(new Error('Test error'));

        const res = await request(app)
            .post('/clients')
            .send({ name: 'Test Client' });

        expect(res.statusCode).toEqual(500);
        expect(res.body).toEqual({ error: 'Internal Server Error' });
    });
});

describe('getAllClients function', () => {
    it('should get all clients', async () => {
        const mockClients = [{ _id: 'client123', name: 'Test Client' }];
        Client.find.mockResolvedValue(mockClients);

        const res = await request(app).get('/clients');

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockClients);
    });

    it('should return 500 if an error is thrown', async () => {
        Client.find.mockRejectedValue(new Error('Test error'));

        const res = await request(app).get('/clients');

        expect(res.statusCode).toEqual(500);
        expect(res.body).toEqual({ error: 'Internal Server Error' });
    });
});

describe('getClientById function', () => {
    it('should get a client by id', async () => {
        const mockClient = { _id: 'client123', name: 'Test Client' };
        Client.findById.mockResolvedValue(mockClient);

        // Uncommented this line
        const res = await request(app).get(`/clients/${mockClient._id}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockClient);
    });

    it('should return 404 if no client is found', async () => {
        Client.findById.mockResolvedValue(null);

        const res = await request(app).get('/clients/nonexistentid');

        expect(res.statusCode).toEqual(404);
        expect(res.body).toEqual({ error: 'Client not found' });
    });

    it('should return 500 if an error is thrown', async () => {
        Client.findById.mockRejectedValue(new Error('Test error'));

        const res = await request(app).get('/clients/client123');

        expect(res.statusCode).toEqual(500);
        expect(res.body).toEqual({ error: 'Internal Server Error' });
    });
});
