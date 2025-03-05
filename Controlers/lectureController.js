const { response } = require("express");
const Lecture = require("../models/luctureModel");
const { mongo, default: mongose } = require("mongoose");
const { options } = require("../Routes/StudentRoutes");

module.exports = {
    addLecturer: async (request, response, next) => {
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
                throw createError(404, "Lecturer not found");
            }
            response.send(getLecture);
        } catch (error) {
            console.log(error.message);
        }
    },
    updateLectureCredentials: async (request, response, next) => {
        const id = request.params.id;
        try {
            const id = request.params.id;
            const update = request.body;
            options = { new: true };
            const updateLecture = await Lecture.findByIdAndUpdate(
                id,
                update,
                options
            );
            if (!updateLecture) {
                throw createError(404, "Lecturer not found");
            }
            response.send(updateLecture);
        } catch (error) {
            console.log(error.message);
        }
    },
    deleteLecture: async (request, response, next) => {
        const id = request.params.id;
        try {
            const deleteLec = await Lecture.findByIdAndRemove(id);
            if (!deleteLec) {
                throw createError(404, "Lecture not found");
            }
            response.send(deleteLec);
        } catch (error) {
            console.log(error.message);
        }
    },
};
