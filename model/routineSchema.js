const mongoose = require('mongoose');
const generateUniqueID = require('../util/idGene');



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
    id: {
        type: String,
        required: true,
        unique: true,
        default: () => {
            return generateUniqueID()
        },
        minlength: 8,
        maxlength: 8
    },
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
        default: () => new Date(),
        require: true,
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

routineSchema.pre('save', function (next) {

    console.log('hi aim ');
    if (!this.id) {
        this.id = generateUniqueID();
    }
    next();
});
module.exports = mongoose.model("routine", routineSchema);
