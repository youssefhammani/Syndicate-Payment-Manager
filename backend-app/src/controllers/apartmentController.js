const express = require('express');
const Apartment = require('../models/Apartment');

const app = express();
app.use(express.json());


const getAllApartments = async (req, res) => {
    try {
        const apartments = await Apartment.find();
        return res.status(200).json(apartments);
    } catch (error) {
        console.error('Error getting all apartments:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getApartmentByIdOrName = async (req, res) => {
    try {
        let query = {};

        if (req.params.id) {
            query._id = req.params.id;
        } else if (req.query.name) {
            // If name is provided, filter by name (case-insensitive)
            query.name = { $regex: new RegExp(req.query.name, 'i') };
        } else {
            return res.status(400).json({ error: 'Invalid request. Please provide an ID or name.' });
        }

        const apartments = await Apartment.find(query);

        if (apartments.length === 0) {
            return res.status(404).json({ error: 'No apartments found' });
        }

        res.status(200).json(apartments);
    } catch (error) {
        console.error('Error getting apartments:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Controller method: Create a new apartment
const createApartment = async (req, res) => {
    try {
        const newApartment = await Apartment.create(req.body);
        return res.status(201).json(newApartment);
    } catch (error) {
        console.error('Error creating apartment:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateApartment = async (req, res) => {
    try {
        const updatedApartment = await Apartment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedApartment) {
            return res.status(404).json({ error: 'Apartment not found' });
        }

        return res.status(200).json(updatedApartment);
    } catch (error) {
        console.error(`Error updating apartment with ID ${req.params.id}:`, error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteApartment = async (req, res) => {
    try {
        const deletedApartment = await Apartment.findByIdAndDelete(req.params.id);

        if (!deletedApartment) {
            return res.status(404).json({ error: 'Apartment not found' });
        }

        return res.status(200).json({ message: 'Apartment deleted successfully' });
    } catch (error) {
        console.error(`Error deleting apartment with ID ${req.params.id}:`, error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    getAllApartments,
    getApartmentByIdOrName,
    createApartment,
    updateApartment,
    deleteApartment
};
