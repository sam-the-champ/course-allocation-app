// models/Lecturer.js
const mongoose = require('mongoose');

const lecturerSchema = new mongoose.Schema({
    lecturerId: { type: String, required: true, unique: true },
    surname: { type: String, required: true },
    firstname : { type: String, required: true },
    email: { type: String, required: true },
    department: { type: String, required: true },
    phonenumber: { type: String },
    gender: { type: String },
    courses: { type: Array, required: false},
    title: { type: String, enum: ['Prof', 'Dr', 'Mr', 'Mrs'] }
});

module.exports = mongoose.model('Lecturer', lecturerSchema);
