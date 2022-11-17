const mongoose = require('mongoose')

// main schema 
const messageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true
    },
    routineId: {
        type: mongoose.Schema.ObjectId,
        ref: 'routine',
        require: true,
    },
    date: {
        type: Date,
        default: () => new Date(),
        require: true,
    },
    message: {
        type: String,
    },
    img: String,

})

module.exports = mongoose.model("message", messageSchema);