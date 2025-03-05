const express = require("express"); //! to import express
require("dotenv").config(); //! to import dotenv
require("./Helpers/init_mongodb"); //! to import init_mongodb from Helpers folder
const app = express(); //! to use express

//! Importing Routes:
const Student_Routes = require("./Routes/StudentRoutes");
const Lecturer_routes = require("./Routes/lecturerRoutes");
const Student_Auth_Routes = require("./Routes/studentAuthRoutes");

//! to use body-parser
app.use(express.json());

app.use("/students", Student_Routes);
app.use("/lecturers", Lecturer_routes);
app.use("/studentAuth", Student_Auth_Routes);

app.use(Student_Routes); //! Using the Imported Routes:
app.use(Lecturer_routes);
app.use(Student_Auth_Routes);

// app.use('students')

//! handling 404 errors
// app.use(async (request, response, next) => {
//     next(createError.NotFound())
// })

// app.use((error, request, response, next) => {
//     response.status
// })

// Middleware
app.listen(process.env.PORT || 3000, () => {
    console.log("Now listening for request on :http://localhost:3000  server");
});