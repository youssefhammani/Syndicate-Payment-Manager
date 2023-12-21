const mongoose = require('mongoose');

const apartmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name for the apartment.'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Please provide a description for the apartment.'],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'Please provide a price for the apartment.'],
    },
    city: {
        type: String,
        required: [true, 'Please provide the city where the apartment is located.'],
        trim: true,
    },
    address: {
        type: String,
        required: [true, 'Please provide the address of the apartment.'],
        trim: true,
    },
    rooms: {
        type: Number,
        required: [true, 'Please specify the number of rooms in the apartment.'],
    },
    floor: {
        type: Number,
        required: [true, 'Please specify the floor of the apartment.'],
    },
    reserved: {
        type: Boolean,
        default: false,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        default: null,
    },
    creationTime: {
        type: Date,
        default: Date.now,
    },
});

const Apartment = mongoose.model('Apartment', apartmentSchema);

module.exports = Apartment;
