const studentAuthController = require("../Controlers/authController");
const express = require("express");

const studentAuthRoute = express.Router();



studentAuthRoute.post("/studentauthadd", studentAuthController.register);
studentAuthRoute.get("/getAllUsers", studentAuthController.getUsers);
studentAuthRoute.get("/login", studentAuthController.login);

module.exports = studentAuthRoute;
