const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//! structure for the lecturer model

const LecturerSchema = new Schema({
    lectureName: {
        type: String,
        required: [true, "Please enter name (both)"],
    },
    lectureEmail: {
        type: String,
        required: [true, "please enter lecture email"],
    },
    lecturePhone: {
        type: String,
        required: [true, "please enter lecture phone"],
    },
    lectureDepartment: {
        type: String,
        required: [true, "please enter lecture department"],
    },
});

const Lecture = mongoose.model("Lecture", LectureSchema);

module.exports = Lecture;
