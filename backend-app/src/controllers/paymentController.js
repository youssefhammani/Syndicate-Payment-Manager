const express = require('express');
const Payment = require('../models/Payment');

const app = express();
app.use(express.json());

// Controller method: Create a new payment
const createPayment = async (req, res) => {
    try {
        // Validate input
        // const { amount, user, apartment } = req.body;

        // if (!amount || isNaN(amount) || amount <= 0) {
        //     return res.status(400).json({ error: 'Invalid amount. Please provide a valid positive number.' });
        // }

        // if (!user || !mongoose.Types.ObjectId.isValid(user)) {
        //     return res.status(400).json({ error: 'Invalid user. Please provide a valid user ID.' });
        // }

        // if (!apartment || !mongoose.Types.ObjectId.isValid(apartment)) {
        //     return res.status(400).json({ error: 'Invalid apartment. Please provide a valid apartment ID.' });
        // }

        // Create payment
        const newPayment = await Payment.create(req.body);

        return res.status(201).json(newPayment);
    } catch (error) {
        // console.error(`Error creating payment: ${error.message}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller method: Get all payments
const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find();
        return res.status(200).json(payments);
    } catch (error) {
        console.error(`Error getting payments: ${error.message}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller method: Get payment by ID
const getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);

        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }

        return res.status(200).json(payment);
    } catch (error) {
        console.error(`Error getting payment with ID ${req.params.id}: ${error.message}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller method: Update payment by ID
const updatePayment = async (req, res) => {
    try {
        const updatedPayment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedPayment) {
            return res.status(404).json({ error: 'Payment not found' });
        }

        return res.status(200).json(updatedPayment);
    } catch (error) {
        console.error(`Error updating payment with ID ${req.params.id}: ${error.message}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller method: Delete payment by ID
const deletePayment = async (req, res) => {
    try {
        const deletedPayment = await Payment.findByIdAndDelete(req.params.id);

        if (!deletedPayment) {
            return res.status(404).json({ error: 'Payment not found' });
        }

        return res.status(200).json({ message: 'Payment deleted successfully' });
    } catch (error) {
        console.error(`Error deleting payment with ID ${req.params.id}: ${error.message}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createPayment,
    getAllPayments,
    getPaymentById,
    updatePayment,
    deletePayment,
};
