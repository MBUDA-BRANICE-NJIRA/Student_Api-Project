const { authSchema } = require("../helpers/validationSchema");
const StudentAuth = require("../models/authModel");
const createError = require("http-errors");
const { signAccessToken } = require("../helpers/jwtHelper");

module.exports = {
    register: async (req, res, next) => {
        try {
            const result = await authSchema.validateAsync(req.body);

            const existingUser = await StudentAuth.findOne({ email: result.email });
            if (existingUser) throw createError.Conflict(`${result.email} already exists`);

            const student = new StudentAuth(result);
            const savedStudent = await student.save();

            res.status(201).json(savedStudent);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    login: async (req, res, next) => {
        try {
            const result = await authSchema.validateAsync(req.body);

            const user = await StudentAuth.findOne({ email: result.email });
            if (!user) throw createError.NotFound("Invalid username/password");

            const isMatch = await user.isValidPassword(result.password);
            if (!isMatch) throw createError.Unauthorized("Invalid username/password");

            const accessToken = await signAccessToken(user.id);
            res.json({ accessToken });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    getAllStudents: async (req, res, next) => {
        try {
            const students = await StudentAuth.find();
            res.json(students);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    addStudent: async (req, res, next) => {
        try {
            const student = new StudentAuth(req.body);
            const savedStudent = await student.save();
            res.status(201).json(savedStudent);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    getStudentById: async (req, res, next) => {
        try {
            const student = await StudentAuth.findById(req.params.id);
            if (!student) throw createError(404, "Student does not exist");

            res.json(student);
        } catch (error) {
            res.status(404).json({ message: "Invalid student ID" });
        }
    },

    updateStudent: async (req, res, next) => {
        try {
            const updatedStudent = await StudentAuth.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!updatedStudent) throw createError(404, "Student not found");

            res.json(updatedStudent);
        } catch (error) {
            res.status(404).json({ message: "Invalid student ID" });
        }
    },

    deleteStudent: async (req, res, next) => {
        try {
            const deletedStudent = await StudentAuth.findByIdAndDelete(req.params.id);
            if (!deletedStudent) throw createError(404, "Student not found");

            res.json({ message: "Student deleted successfully" });
        } catch (error) {
            res.status(404).json({ message: "Invalid student ID" });
        }
    },
};
