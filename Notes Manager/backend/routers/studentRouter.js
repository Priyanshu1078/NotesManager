const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

router.get('/students', async (req, res) => {
    try {
        const students = await Student.find({}, { _id: 1, name: 1, rollno: 1 });
        res.json({ students });
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/students', async (req, res) => {
    try {
        const { name, rollno } = req.body;
        const newStudent = new Student({ name, rollno });
        await newStudent.save();
        res.json({ message: 'Student added successfully' });
    } catch (error) {
        console.error('Error adding student:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/students/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, rollno } = req.body;

        const updatedStudent = await Student.findByIdAndUpdate(id, { name, rollno }, { new: true });
        res.json({ updatedStudent });
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/students/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Student.findByIdAndDelete(id);
        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
