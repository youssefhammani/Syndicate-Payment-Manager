// FILEPATH: /home/yhammani/My Coding Vault/Syndicate-Payment-Manager/backend-app/tests/paymentController.test.js

const { Request, Response } = require('jest-express');
const { createPayment, getAllPayments } = require('../src/controllers/paymentController');
const Payment = require('../src/models/Payment');

jest.mock('../src/models/Payment.js');

describe('createPayment function', () => {
    console.error = jest.fn();
    it('should create a new payment', async () => {
        const req = new Request({
            body: {
                amount: 100,
                user: 'user123',
                apartment: 'apartment123',
            },
        });

        const res = new Response();

        const mockPayment = { _id: 'payment123', amount: 100, user: 'user123', apartment: 'apartment123' };
        Payment.create.mockResolvedValue(mockPayment);

        await createPayment(req, res);

        expect(res.statusCode).toEqual(201);
        expect(res.body).toEqual(mockPayment);
    });

    it('should return 500 if an error is thrown', async () => {
        const req = new Request({
            body: {
                amount: 100,
                user: 'user123',
                apartment: 'apartment123',
            },
        });

        const res = new Response();

        Payment.create.mockRejectedValue(new Error('Test error'));

        await createPayment(req, res);

        expect(res.statusCode).toEqual(500);
        expect(res.body).toEqual({ error: 'Internal Server Error' });
    });
});

describe('getAllPayments function', () => {
    it('should get all payments', async () => {
        const req = new Request();
        const res = new Response();

        const mockPayments = [
            { _id: 'payment123', amount: 100, user: 'user123', apartment: 'apartment123' },
            { _id: 'payment456', amount: 200, user: 'user456', apartment: 'apartment456' },
        ];
        Payment.find.mockResolvedValue(mockPayments);

        await getAllPayments(req, res);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockPayments);
    });

    it('should return 500 if an error is thrown', async () => {
        const req = new Request();
        const res = new Response();

        Payment.find.mockRejectedValue(new Error('Test error'));

        await getAllPayments(req, res);

        expect(res.statusCode).toEqual(500);
        expect(res.body).toEqual({ error: 'Internal Server Error' });
    });
});