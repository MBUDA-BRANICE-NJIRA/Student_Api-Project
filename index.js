const express = require("express"); //! to import express
require("dotenv").config(); //! to import dotenv
require("./helpers/init_mongodb"); //! to import init_mongodb from Helpers folder
const helmet = require("helmet"); //! to import helmet for security
const rateLimit = require("express-rate-limit"); //! to import express-rate-limit for rate limiting

const app = express(); //! to use express


app.use(helmet()); //! to use helmet for security
//Linmit request from same API
const Limiter = rateLimit ({
    max: 100,
    windowMs: 60 *60* 1000,
    message: "Too many request from this IP, please try again in an hour"
});
// app.use("/api", Limiter);


//! Importing Routes:
const Student_Routes = require("./Routes/StudentRoutes");
const Lecturer_routes = require("./Routes/lectureRoutes");
const Student_Auth_Routes = require("./Routes/authRoutes");

//! to use body-parser
app.use(express.json());

app.use("/students", Student_Routes);
app.use("/lectures", Lecturer_routes);
app.use("/studentAuth", Student_Auth_Routes);

//! Using the Imported Routes:
app.use(Student_Routes); //! Using the Imported Routes:
app.use(Lecturer_routes);
app.use(Student_Auth_Routes);

// app.use('students')

//! handling 404 errors
app.use(async (request, response, next) => {
    next(createError.NotFound())
})

app.use((error, request, response, next) => {
    response.status
})

//handling 404 error
//Error handler
app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    res.send({
        error:{
            status:err.status || 500,
            message: err.message,
        },
    });
});

//To connect with the react APPLICATION WE ALLOW THE API This avoids the Course error
// Middleware
app.listen(process.env.PORT || 5000, () => {
    console.log(`Now listening for request on http://localhost:${process.env.PORT}`);
});