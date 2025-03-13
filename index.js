const express = require("express");
require("dotenv").config(); //! Load environment variables
require("./helpers/init_mongodb"); //! Initialize MongoDB
const app = express();
const rateLimit = require("express-rate-limit"); //! Rate limiting
const createError = require("http-errors"); //! Error handling
const helmet = require("helmet"); //! Security middleware

const cors = require("cors");

//! CORS middleware
app.use(express.json());

app.use(helmet());


const allowedOrigins = ["http://localhost:3000"];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);


//! Importing Routes:
const Student_Routes = require("./Routes/StudentRoutes");
const Lecturer_routes = require("./Routes/lectureRoutes");
const Student_Auth_Routes = require("./Routes/authRoutes");

//! Security Middleware


//! Request Rate Limiting
const Limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, // 1 hour
  message: "Too many requests from this IP, please try again in an hour",
});
app.use("/api", Limiter);

//! Body Parser Middleware


//! Route Middleware
app.use("/api/students", Student_Routes);
app.use("/api/lectures", Lecturer_routes);
app.use("/api/studentAuth", Student_Auth_Routes);

//! Handling 404 Errors
app.use(async (req, res, next) => {
  next(createError.NotFound());
});

//! Error Handler Middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

//! Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Now listening for requests on http://localhost:${PORT}`);
});
