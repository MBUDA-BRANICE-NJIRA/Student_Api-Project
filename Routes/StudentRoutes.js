
const Student_controller = require("../Controlers/studentController");
//! Import the express module

const express = require("express");

//! Create a new router instance
const routes = express.Router();

//! get a list of all students from the database
routes.get("/getAllStudents", Student_controller.getAllStudents);

//! add student to the database
routes.post("/addStudent", Student_controller.addStudent);

//! get a student by id from the database
routes.get("/getStudentById/id:", Student_controller.getStudentById);

//! update student in database
routes.patch("/updateStudent/id:", Student_controller.updateStudent);

//! delete student from database
routes.delete("/deleteStudent/id:", Student_controller.deleteStudent);

module.exports = routes;
