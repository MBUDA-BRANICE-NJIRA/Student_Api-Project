const Student_controller = require("../Controlers/studentController");
//! Import the express module
const express = require("express");

//! Create a new router instance
const Student_Route = express.Router();

//! get a list of all students from the database
Student_Route.get("/getAllStudents", Student_controller.getAllStudents);

//! add student to the database
Student_Route.post("/addStudent", Student_controller.addStudent);

//! get a student by id from the database
Student_Route.get("/getStudentById/id:", Student_controller.getStudentById);

//! update student in database
Student_Route.patch("/updateStudent/id:", Student_controller.updateStudent);

//! delete student from database
Student_Route.delete("/deleteStudent/id:", Student_controller.deleteStudent);

module.exports = Student_Route;
