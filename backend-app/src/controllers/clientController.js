const express = require('express');
const Client = require('../models/Client.js');

const app = express();
app.use(express.json());

// Controller method: Create a new Client
const createClient = async (req, res) => {
    try {
        const newClient = await Client.create(req.body);
        return res.status(201).json(newClient);
    } catch (error) {
        console.error(`Error creating Client: ${error.message}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller method: Get all Clients
const getAllClients = async (req, res) => {
    try {
        const Clients = await Client.find();
        return res.status(200).json(Clients);
    } catch (error) {
        console.error(`Error getting Clients: ${error.message}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller method: Get Client by ID
const getClientById = async (req, res) => {
    try {
        console.log("req.params.id", req.params.id);
        const Client = await Client.findById(req.params.id);

        if (!Client) {
            return res.status(404).json({ error: 'Client not found' });
        }

        return res.status(200).json(Client);
    } catch (error) {
        console.error(`Error getting Client with ID ${req.params.id}: ${error.message}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller method: Update Client by ID
const updateClient = async (req, res) => {
    try {
        const updatedClient = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!updatedClient) {
            return res.status(404).json({ error: 'Client not found' });
        }

        return res.status(200).json(updatedClient);
    } catch (error) {
        console.error(`Error updating Client with ID ${req.params.id}: ${error.message}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller method: Delete Client by ID
const deleteClient = async (req, res) => {
    try {
        const deletedClient = await Client.findByIdAndDelete(req.params.id);

        if (!deletedClient) {
            return res.status(404).json({ error: 'Client not found' });
        }

        return res.status(200).json({ message: 'Client deleted successfully' });
    } catch (error) {
        console.error(`Error deleting Client with ID ${req.params.id}: ${error.message}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createClient,
    getAllClients,
    getClientById,
    updateClient,
    deleteClient,
};
