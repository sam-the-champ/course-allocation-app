const mongoose = require('mongoose');

const allocationSchema = new mongoose.Schema({
  lecturerId: { type: String, required: true, unique: true },
  courseCode: { type: String, required: true },
  courseTitle: { type: String, required: true },
  level: { type: String, required: true },
  courseUnits: { type: Number, required: true },
  semester: { type: String, required: true },
  classDate: { type: Date, required: true },
  classTime: { type: String, required: true },
});

module.exports = mongoose.model('Allocation', allocationSchema);
