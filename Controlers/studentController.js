//!
const express = require("express");
const { studentAuth } = require("../Helpers/validationSchema");
const Student = require("../Models/StudentModel");
const createError = require("http-errors");
const { mongo, default: mongoose } = require("mongoose");
module.exports = {
    getAllStudents: async (request, response, next) => {
        try {
            const result = await Student.find();
            response.send(result);
        } catch (error) {
            console.log(error.message);
        }
    },
    addStudent: async (request, response, next) => {
        try {
            // const student = new Student(request.body)
            // const result = await student.save()
            // response.send(result)
            const { userName } = request.body;
            const result = await studentAuth.validateAsync(request.body);
            const student = new Student(result);
            const saveStudent = await student.save();
            response.send(saveStudent);
        } catch (error) {
            if (error.isJoi === true) error.status = 422;
            next(error.message);
        }
    },
    getStudentById: async (request, response, next) => {
        const id = request.params.id;
        try {
            const student = await Student.findById(id);
            if (!student) {
                throw createError(
                    404,
                    "Student does not exist, Please try again"
                );
            }
            response.send(student);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.castError) {
                next(createError(404, "Invalid student Id"));
                return;
            }
        }
    },

    updateStudent: async (request, response, next) => {
        try {
            const id = request.params.id;
            const update = request.body;
            const options = { new: true };
            const result = await Student.findByIdAndUpdate(id, update, options);
            if (!result) {
                throw createError(
                    404,
                    "Student does not exist, Please try again"
                );
            }
            response.send(result);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.castError) {
                return next(createError(404, "Invalid student Id"));
            }
        }
    },
    deleteStudent: async (request, response, next) => {
        const id = request.params.id;
        try {
            const student = await Student.findByIdAndDelete(id);
            if (!student) {
                throw createError(
                    404,
                    "Student does not exist, Please try again"
                );
            }
            response.send(student);
        } catch (error) {
            console.log(error.message);
            if (error instanceof mongoose.castError) {
                next(createError(404, "Invalid student Id"));
                return;
            }
        }
    },
};
