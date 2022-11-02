const mongoose = require('mongoose')

const classSchema = new mongoose.Schema({
    day: {
        type: String,
        required: true,
    },
    roomNumber: String,
    subjectName: String,
    subjectCode: String,
    teacherName: String,
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },

})
// main schema 
const routineSchema = new mongoose.Schema({
    department: {
        type: String,
        required: true
    },
    institute: {
        type: String,
        required: true,

    },
    section: {
        type: String,
        required: true
    },
    semester: {
        type: String,
        required: true
    },
    shift: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: () => new Date()
    },
    totalUserUsing: {
        type: Number,
        default: () => 0,
    },
    creator: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true
    },
    requestId: {
        type: mongoose.Schema.ObjectId,
        ref: 'request',
        required: false,
    },
    classes: [classSchema],

})
module.exports = mongoose.model("routine", routineSchema);