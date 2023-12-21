const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        unique: true,
        type: String,
        required: true,
    },
    password: {
        type: String,
        // required: true,
    },
    phoneNumber: {
        type: String,
        default: null,
    },
    image: {
        type: String,
        default: "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png",
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
