const { authSchema } = require("../Helpers/validationSchema");
const StudentAuth = require("../Models/studentAuthModel");
const createError = require("http-errors");
const { signAccessToken } = require("../Helpers/jwtHelper");

module.exports = {
    register: async (request, response, next) => {
        try {
            const { email } = request.body;
            const result = await authSchema.validateAsync(request.body);
            const Exists = await StudentAuth.findOne({ email: email });
            if (Exists) throw createError.Conflict(`${email} already exists`);
            const student = new StudentAuth(result);
            const savedStudent = await student.save();

            response.send(savedStudent);
        } catch (error) {
            if (error.isJoi === true) error.status = 422;
            next(error.message);
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
};
