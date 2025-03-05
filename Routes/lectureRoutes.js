const express = require("express");
const Lecturer_contoller = require("../Controlers/lecturerController");

const Lecturer_route = express.Router();

Lecturer_route.post("/addLecturer", Lecturer_contoller.addLecturer);

Lecturer_route.get("/all-Lecturers", Lecturer_contoller.getAllLecturers);

Lecturer_route.get("/lecturer-details/id:", Lecturer_contoller.getLecturerById);

Lecturer_route.patch(
    "/updateLecturerDetails/id:",
    Lecturer_contoller.updateLecturerCredentials
);

Lecturer_route.delete("/delete-Lecturer/id:", Lecturer_contoller.deleteLecture);

module.exports = Lecturer_route;
