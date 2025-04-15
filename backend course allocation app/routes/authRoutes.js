const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');  // Assuming Admin model is set up
const Lecturer = require('../models/Lecturer');  // Assuming Lecturer model is set up
const router = express.Router();

// Admin login route (with hardcoded credentials)
router.post('/admin/login', async (req, res) => {
    const { username, password } = req.body;

    // Hardcoded admin credentials (replace with your actual credentials)
    const adminUsername = 'admin';
    const adminPassword = 'admin123';

    // Check if the credentials match the hardcoded values
    if (username !== adminUsername || password !== adminPassword) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT for admin
    const token = jwt.sign({ username: adminUsername }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, redirectTo: 'admin-dashboard.html' });
});

// Lecturer login route
router.post('/lecturer/login', async (req, res) => {
    const { lecturerId, surname } = req.body;

    const lecturer = await Lecturer.findOne({ lecturerId, surname: surname.toUpperCase() });

    if (!lecturer) {
        return res.status(400).json({ message: 'Lecturer not found or invalid credentials' });
    }

    // Generate JWT for lecturer
    // const token = jwt.sign({ lecturerId: lecturer.lecturerId }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token: lecturer.lecturerId, redirectTo: 'lecturer-dashboard.html' });
});

router.post('/logout', async (req, res) => {

    res.json({ redirectTo: 'index.html' });
});

module.exports = router;
