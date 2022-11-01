const mongoose = require('mongoose')

// main schema 
const requestSchema = new mongoose.Schema({
    img: {
        type: String,
        required: true,
    },
    message: String,
    date: {
        type: Date,
        default: () => new Date()
    },
    creator: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true
    },
    status: {
        type: String,
        default: () => "pending",
    },
    adminMessage: {
        type: String,
        default: () => ""
    },
    routineId: {
        type: mongoose.Schema.ObjectId,
        ref: 'routine',
        required: false,
    },

})

module.exports = mongoose.model("request", requestSchema);