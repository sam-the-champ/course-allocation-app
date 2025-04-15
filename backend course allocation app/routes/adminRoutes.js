// routes/adminRoutes.js
const express = require('express');
const Lecturer = require('../models/Lecturer');
const Course = require('../models/Course');
const allocation = require('../models/Allocation');
const admin = require('../models/Admin')
const router = express.Router();

// Add Lecturer route
router.post('/add-lecturer', async (req, res) => {
    try {
      const { lecturerId, surname, firstname, email, department, phone, gender, title } = req.body;
  
      // Check if the lecturer already exists
      const existing = await Lecturer.findOne({ lecturerId });
      if (existing) {
        return res.status(400).json({ success: false, message: 'Lecturer with this ID already exists.' });
      }
  
      const newLecturer = new Lecturer({
        lecturerId,
        surname: surname.toUpperCase(),
        firstname,
        email,
        department,
        phone,
        gender,
        title
      });
  
      await newLecturer.save();
      res.status(201).json({ success: true, message: 'Lecturer added successfully.' });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Server error. Could not add lecturer.' });
    }
  });
// Add Course route
// Add Course route
router.post('/add-course', async (req, res) => {
    try {
      const { courseCode, courseTitle, semester, description } = req.body;
  
      if (!courseCode || !courseTitle || !semester) {
        return res.status(400).json({ success: false, message: "Please provide all required fields." });
      }
  
      // Check if course already exists
      const existing = await Course.findOne({ courseCode });
      if (existing) {
        return res.status(400).json({ success: false, message: "Course with this code already exists." });
      }
  
      const course = new Course({ courseCode, courseTitle, semester, description });
      await course.save();
  
      res.status(201).json({ success: true, message: "Course added successfully." });
    } catch (error) {
      console.error("Error adding course:", error);
      res.status(500).json({ success: false, message: "Server error. Could not add course." });
    }
  });
  
// Allocate Course route (Link lecturer to course)
router.post('/allocate-course', async (req, res) => {
    try {
        const { lecturerId, courseCode, level, courseUnits, semester, classDate, classTime } = req.body;

        // Validate inputs
        if (!lecturerId || !courseCode || !level || !courseUnits || !semester || !classDate || !classTime) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const lecturer = await Lecturer.findOne({ lecturerId });
        if (!lecturer) return res.status(404).json({ message: 'Lecturer not found.' });

        const course = await Course.findOne({ courseCode });
        if (!course) return res.status(404).json({ message: 'Course not found.' });

        // Ensure lecturer.courses is initialized
        if (!Array.isArray(lecturer.courses)) lecturer.courses = [];

        // Check for duplicate allocation
        const alreadyAllocated = lecturer.courses.some(
            (c) => c.courseCode === course.courseCode && c.level === level && c.semester === semester
        );

        if (alreadyAllocated) {
            return res.status(409).json({ message: 'This course is already allocated to this lecturer for the specified level and semester.' });
        }

        // Push allocation
        lecturer.courses.push({
            courseCode: course.courseCode,
            courseTitle: course.courseTitle,
            level,
            courseUnits,
            semester,
            classDate,
            classTime
        });

        await lecturer.save();

        return res.status(200).json({ message: 'Course allocated to lecturer successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error. Could not allocate course.' });
    }
});

router.get('/get-data', async (req, res) => {
  try {  
          const allCourses = await Course.find({});
          const lecturers = await Lecturer.find({});
          if (!allCourses) {
              return res.status(404).json({ message: 'No course available.' });
          }
          if (!lecturers) {
              return res.status(404).json({ message: 'No Lecturer available.' });
          }
  
          res.status(200).json({
              courses: [...allCourses],
              lecturers: [...lecturers]
          });
  
      } catch (err) {
          console.error(err);
          res.status(500).json({ message: 'Server error. Could not fetch courses.' });
      }
})


module.exports = router;

