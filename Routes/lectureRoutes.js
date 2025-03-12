const express = require("express");
const Lecture_contoller = require("../Controlers/lectureController");

const Lecture_route = express.Router();

Lecture_route.post("/addLecture", Lecture_contoller.addLecture);

Lecture_route.get("/all-Lecturers", Lecture_contoller.getAllLectures);

Lecture_route.get("/lecture-details/:id", Lecture_contoller.getLectureById);

Lecture_route.patch("/updateLectureDetails/:id", Lecture_contoller.updateLectureDetails);

Lecture_route.delete("/delete-Lecture/:id", Lecture_contoller.deleteLecture);

module.exports = Lecture_route;