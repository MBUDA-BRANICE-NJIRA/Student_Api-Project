const { response } = require("express");
const Lecture = require("../models/lectureModel");
const { options } = require("../Routes/StudentRoutes");
const createError = require('http-errors');
const {default: mongoose} = require('mongoose');

module.exports = {
    addLecture: async (request, response, next) => {
        try {
            const addLecture = new Lecture(request.body);
            const result = await addLecture.save();
            response.send(result);
        } catch (error) {
            console.log(error.message);
        }
    },
    getAllLectures: async (request, response, next) => {
        try {
            const result = await Lecture.find();
            response.send(result);
        } catch (error) {
            console.log(error.message);
        }
    },
    getLectureById: async (request, response, next) => {
        const id = request.params.id;
        try {
            const getLecture = await Lecture.findById(id);
            if (!getLecture) {
                return response.status(404).send({ message: "Lecture not found" });
            }
            response.send(getLecture);
        } catch (error) {
            console.error(error);
            return response.status(500).send({ message: "Internal Server Error" });
        }
    },

    updateLectureDetails: async (request, response, next) => {
        const id = request.params.id;
        const update = request.body;
        const options = { new: true };
      
        try {
          const updateLecture = await Lecture.findByIdAndUpdate(id, update, options);
          if (!updateLecture) {
            throw createError(404, "Lecture not found");
          }
          response.send(updateLecture);
        } catch (error) {
          if (error.name === "CastError") {
            return response.status(400).send({ message: "Invalid lecture ID" });
          }
          console.error("Error:", error);
          response.status(500).send({ message: "Internal Server Error" });
        }
      },
      deleteLecture: async (request, response, next) => {
        const id = request.params.id;
      
        try {
          const deletedLecture = await Lecture.findByIdAndRemove(id);
          if (!deletedLecture) {
            throw createError(404, "Lecture not found");
          }
          response.send({ message: "Lecture deleted successfully" });
        } catch (error) {
          if (error.name === "CastError") {
            return response.status(400).send({ message: "Invalid lecture ID" });
          }
          console.error("Error:", error);
          response.status(500).send({ message: "Internal Server Error" });
        }
      }, 
};

function generateSecretKey() {
    const secretKey = crypto.randomBytes(16).toString('hex');
    return secretKey;
}