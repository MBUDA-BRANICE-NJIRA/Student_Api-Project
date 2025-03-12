const { authSchema } = require("../helpers/validationSchema");
const StudentAuth = require("../models/authModel");
const createError = require("http-errors");
const { signAccessToken } = require("../helpers/jwtHelper");

module.exports = {
    register: async (request, response, next) => {
        try {
            const { email } = request.body;
            const result = await authSchema.validateAsync(request.body);
            const Exists = await StudentAuth.findOne({ email: email });
            if (Exists) throw createError.Conflict(`${email} already exists`);
            //ragex for email validetion
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!regex.test(email)) throw createError.Conflict("Invalid email");
            //ragex for password validetion
            const regex1 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&?]{8,}$/;
            if (!regex1.test(result.password)) throw createError.Conflict("Password must be at least 8 characters long and must contain at least one uppercase letter, one lowercase letter, one digit, and one special character");
            const student = new StudentAuth(result);
            const savedStudent = await student.save();

            response.send(savedStudent);
        } catch (error) {
            response.send({"message":error.message})
        }
    },

    getUsers: async (request, response, next) => {
        try {
            const users = await StudentAuth.find();
            response.send(users);
        } catch (error) {
            console.log(error.message);
        }
    },

    login: async (request, response, next) => {
        try {
            const result = await authSchema.validateAsync(request.body);
            console.log(result)
            const user = await StudentAuth.findOne({ email: result.email });
            if (!user)
                throw createError.NotFound(
                    "Invalid username / password. Please try again"
                );

            //! check if password match in db
            const isMatch = await user.isValidPassword(result.password);
            if (!isMatch)
                throw createError.Unauthorized(
                    "Invalid username / password. Please try again"
                );
            // response.send('Login Successful')
            const accessToken = await signAccessToken(user.id);
            response.send({ accessToken });
        } catch (error) {
            if (error.isJoi === true)
                return next(
                    createError.BadRequest(
                        "Invalid username / password. Please try again"
                    )
                );
            next(error);
        }
    },
       getAllStudents: async (request, response, next) => {
            try {
                const result = await Student.find();
                response.send(result);
            } catch (error) {
                console.log(error.message);
            }
        },
        addStudent: async (req, res, next) => {
            try {
                
                const student = new Student(req.body);
                const saveStudent = await student.save();
                res.send(saveStudent);
            } catch (error) {
                if (error.isJoi === true) error.status = 422;
                next(error.message);
            }
        },
        getStudentById: async (request, response, next) => {
            const id = request.params.id;
            try {
                const student = await Student.findById(id);
                if (!student) {
                    throw createError(
                        404,
                        "Student does not exist, Please try again"
                    );
                }
                response.send(student);
            } catch (error) {
                console.log(error.message);
                if (error instanceof mongoose.castError) {
                    next(createError(404, "Invalid student Id"));
                    return;
                }
            }
        },
    
        updateStudent: async (request, response, next) => {
            try {
                const id = request.params.id;
                const update = request.body;
                const options = { new: true };
                const result = await Student.findByIdAndUpdate(id, update, options);
                if (!result) {
                    throw createError(
                        404,
                        "Student does not exist, Please try again"
                    );
                }
                response.send(result);
            } catch (error) {
                console.log(error.message);
                if (error instanceof mongoose.castError) {
                    return next(createError(404, "Invalid student Id"));
                }
            }
        },
        deleteStudent: async (request, response, next) => {
            const id = request.params.id;
            try {
                const student = await Student.findByIdAndDelete(id);
                if (!student) {
                    throw createError(
                        404,
                        "Student does not exist, Please try again"
                    );
                }
                response.send(student);
            } catch (error) {
                console.log(error.message);
                if (error instanceof mongoose.castError) {
                    next(createError(404, "Invalid student Id"));
                    return;
                }
            }
        },
};
