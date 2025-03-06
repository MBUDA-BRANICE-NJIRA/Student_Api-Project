const mongoose = require("mongoose");
const LectureSchema = mongoose.Schema;


//! structure for the lecturer model

const LecturerSchema = new LectureSchema({
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

const Lecture = mongoose.model("Lecture", LecturerSchema);

module.exports = Lecture;
