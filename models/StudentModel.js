const mongoose = require("mongoose");

//! Connect to MongoDB
const Schema = mongoose.Schema;

//? The schema for the user model (structure)
const studentSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "firstname is required"],
    },
    lastName: {
        type: String,
        required: [true, "lastname is required"],
    },
    Gender: {
        type: String,
    },
});

//? Creating the model
const Student = mongoose.model("student", studentSchema);

//? Exporting the model
module.exports = Student;
