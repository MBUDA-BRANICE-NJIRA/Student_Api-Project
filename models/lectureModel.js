const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//! structure for the lecturer model

const LecturerSchema = new Schema({
    lecturerName: {
        type: String,
        required: [true, "Please enter name (both)"],
    },
    lecturerEmail: {
        type: String,
        required: [true, "please enter lecturer email"],
    },
    lecturerPhone: {
        type: String,
        required: [true, "please enter lecturer phone"],
    },
    lecturerDepartment: {
        type: String,
        required: [true, "please enter lecturer department"],
    },
});

const Lecturer = mongoose.model("Lecturer", LecturerSchema);

module.exports = Lecturer;
