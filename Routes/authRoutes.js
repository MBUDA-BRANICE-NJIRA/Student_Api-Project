const express = require("express");
const router = express.Router();
const studentAuthController = require("../Controlers/authController");

router.post("/register", studentAuthController.register);
router.post("/login", studentAuthController.login);
router.get("/getAllStudents", studentAuthController.getAllStudents);
router.post("/addStudent", studentAuthController.addStudent);
router.get("/getStudentById/:id", studentAuthController.getStudentById);
router.put("/updateStudent/:id", studentAuthController.updateStudent);
router.delete("/deleteStudent/:id", studentAuthController.deleteStudent);

module.exports = router;
