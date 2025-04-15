// models/Course.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseCode: { type: String, required: true, unique: true },
    courseTitle: { type: String, required: true },
    semester: { type: String, required: true },
    description: { type: String, required: true }
});

module.exports = mongoose.model('Course', courseSchema);
