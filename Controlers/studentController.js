//!
const express = require("express");
const app = express();
const { studentAuth } = require("../helpers/validationSchema");
const Student = require("../models/studentModel");
const createError = require("http-errors");
const { default: mongoose } = require("mongoose");
module.exports = {
  getAllStudents: async (req, res, next) => {
    try {
      const result = await Student.find();
      res.json(result);
    } catch (error) {
      console.error("Error fetching students:", error.message);
      next(error);
    }
  },

  addStudent: async (req, res, next) => {
    try {
      const student = new Student(req.body);
      const saveStudent = await student.save();
      res.send(saveStudent);
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
        throw createError(404, "Student does not exist, Please try again");
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
        throw createError(404, "Student does not exist, Please try again");
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
        throw createError(404, `Student with ID ${id} not found`);
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
