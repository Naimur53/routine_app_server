const mongoose = require('mongoose')

// main schema 
const userSchema = new mongoose.Schema({
    displayName: String,
    email: String,
    photoURL: String,
    createdAt: String,

    department:String,
    institute: String,
    section:String,
    semester:String,
    shift: String,
    bio:{
        type:String,
        default:''
    },

    thumbnail:{
        type:String,
        default:'https://i.ibb.co/C7m1B5f/profilebg-f79815682983162a5b95.jpg'
    },

    isAdmin: {
        type: Boolean,
        default: false,
    },
    uid: String,

})

module.exports = mongoose.model("user", userSchema);