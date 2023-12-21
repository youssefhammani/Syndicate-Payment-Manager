const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: [true, "Amount of payment is required"],
    },
    date: {
        type: Date,
        required: [true, "Date of payment is required"],
        default: Date.now,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
    apartment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Apartment", // Corrected the reference model name to "Apartment"
        default: null,
    },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
