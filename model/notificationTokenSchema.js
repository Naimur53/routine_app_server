const mongoose = require('mongoose')

// main schema 
const notificationToken = new mongoose.Schema({
    token: {
        type: String,
        require: true,
    },

})

module.exports = mongoose.model("notificationToken", notificationToken);