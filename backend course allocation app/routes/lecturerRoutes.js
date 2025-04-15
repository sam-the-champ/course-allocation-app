const express = require('express');
const Lecturer = require('../models/Lecturer');
const Course = require('../models/Course');
const allocation = require('../models/Allocation');
const router = express.Router();

// Get Lecturer Information
router.get('/get-lecturer-info/:lecturerId', async (req, res) => {
    try {
        const lecturerId = req.params.lecturerId;

        // Find lecturer by ID
        const lecturer = await Lecturer.findOne({ lecturerId });
        if (!lecturer) {
            return res.status(404).json({ message: 'Lecturer not found.' });
        }

        // Fetch allocated courses for the lecturer
        const allocatedCourses = lecturer.courses.map(async (allocation) => {
            const course = await Course.findOne({ courseCode: allocation.courseCode });
            return {
                courseCode: allocation.courseCode,
                courseTitle: allocation.courseTitle,
                level: allocation.level,
                semester: allocation.semester,
                units: allocation.courseUnits,
                date: allocation.classDate,
                time: allocation.classTime
            };
        });

        const courses = await Promise.all(allocatedCourses);
        console.log(courses)
        // Return lecturer details along with courses
        res.status(200).json({
            lecturer: {
                name: `${lecturer.firstname} ${lecturer.surname}`,
                email: lecturer.email,
                department: lecturer.department,
                courses: lecturer.courses
            },
            courses
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error. Could not fetch lecturer information.' });
    }
});


// router.get('/allocated-courses/:lecturerId', async (req, res) => {
//     try {
//         const lecturerId = req.params.lecturerId;

//         // Find lecturer by ID
//         const lecturerCourses = await allocation.findOne({ lecturerId });
//         console.log(lecturerCourses)
//         if (!lecturerCourses) {
//             return res.status(404).json({ message: 'No allocated courses found' });
//         }


//         // Return lecturer details along with courses
//         res.status(200).json({
//             ...lecturerCourses
//             // courses
//         });

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server error. Could not fetch lecturer course information.' });
//     }
// });

module.exports = router;
