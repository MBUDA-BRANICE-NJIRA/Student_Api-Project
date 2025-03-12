const express = require("express");
const routes = express.Router();
const authController = require("../Controlers/authController");
const studentAuthController = require("../Controlers/authController");

const mongoose = require("mongoose");
// const student = require("../models/StudentModel");



routes.post("/register", studentAuthController.register);
routes.get("/login", studentAuthController.login);
routes.get('/getAllStudents', authController.getAllStudents);
routes.post('/AddStudent', authController.addStudent);




module.exports = routes;
