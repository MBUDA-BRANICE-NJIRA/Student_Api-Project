const { response } = require("express");
const Lecturer = require("../Models/lucturerModel");
const { mongo, default: mongose } = require("mongoose");
const { options } = require("../Routes/StudentRoutes");

module.exports = {
    addLecturer: async (request, response, next) => {
        try {
            const addLecturer = new Lecturer(request.body);
            const result = await addLecturer.save();
            response.send(result);
        } catch (error) {
            console.log(error.message);
        }
    },
    getAllLecturers: async (request, response, next) => {
        try {
            const result = await Lecturer.find();
            response.send(result);
        } catch (error) {
            console.log(error.message);
        }
    },
    getLecturerById: async (request, response, next) => {
        const id = request.params.id;
        try {
            const getLecturer = await Lecturer.findById(id);
            if (!getLecturer) {
                throw createError(404, "Lecturer not found");
            }
            response.send(getLecturer);
        } catch (error) {
            console.log(error.message);
        }
    },
    updateLecturerCredentials: async (request, response, next) => {
        const id = request.params.id;
        try {
            const id = request.params.id;
            const update = request.body;
            options = { new: true };
            const updateLecturer = await Lecturer.findByIdAndUpdate(
                id,
                update,
                options
            );
            if (!updateLecturer) {
                throw createError(404, "Lecturer not found");
            }
            response.send(updateLecturer);
        } catch (error) {
            console.log(error.message);
        }
    },
    deleteLecture: async (request, response, next) => {
        const id = request.params.id;
        try {
            const deleteLec = await Lecturer.findByIdAndRemove(id);
            if (!deleteLec) {
                throw createError(404, "Lecturer not found");
            }
            response.send(deleteLec);
        } catch (error) {
            console.log(error.message);
        }
    },
};
