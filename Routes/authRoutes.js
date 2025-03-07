const studentAuthController = require("../Controlers/authController");
const express = require("express");

const studentAuthRoute = express.Router();



studentAuthRoute.post("/register", studentAuthController.register);
studentAuthRoute.get("/getAllUsers", studentAuthController.getUsers);
studentAuthRoute.post("/login", studentAuthController.login);

module.exports = studentAuthRoute;
