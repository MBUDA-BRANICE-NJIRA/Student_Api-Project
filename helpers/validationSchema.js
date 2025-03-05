const Joi = require("joi");

const authSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required(),
});

const studentAuth = Joi.object({
    firstName: Joi.string()
        .pattern(/^[A-Za-z]+$/)
        .min(1)
        .required()
        .messages({ pattern: "Username must only contain letters" }),
    lastName: Joi.string()
        .pattern(/^[a-zA-Z$]+/)
        .min(1)
        .required(),
    Gender: Joi.string()
        .min(4)
        .pattern(/^[a-zA-Z]+$/)
        .required(),
});

module.exports = { authSchema, studentAuth };
