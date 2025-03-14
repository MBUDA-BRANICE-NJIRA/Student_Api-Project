const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const User = require("../models/authModel");
const { response } = require("express");

module.exports = {
    signAccessToken: (UserId,  userRole) => {
        return new Promise((resolve, reject) => {
            const payload = {};
            const Secret = process.env.ACCESS_TOKEN_SECRET;
            const options = {
                expiresIn: "10m",
                issuer: "BraniceTechnologies.com",
                audience: UserId,
            };
            JWT.sign(payload, Secret, options, (error, token) => {
                if (error) {
                    console.log(error.message);
                    reject(createError.InternalServerError());
                }
                resolve(token);
            });
        });
    },

    verifyAccessToken: (request, response, next) => {
        if (!request.headers["authorization"])
            return next(createError.Unauthorized());
        const authHeader = request.headers["authorization"];
        const bearerToken = authHeader.split(" ");
        const token = bearerToken[1];

        JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, payload) => {
            if (error) {
                if (error.name === "JsonWebTokenError") {
                    return next(createError.Unauthorized());
                } else {
                    return next(createError.Unauthorized(error.message));
                }
            }
            request.payload = payload;
            next();
        });
    },

    signRefreshToken: (UserId) => {
        return new Promise((resolve, reject) => {
            const payload = {};
            const Secret = process.env.ACCESS_TOKEN_SECRET;
            const options = {
                expiresIn: "1d",
                issuer: "BraniceTechnologies.com",
                audience: UserId,
            };
            JWT.sign(payload, Secret, options, (error, token) => {
                if (error) {
                    console.log(error.message);
                    reject(createError.InternalServerError());
                }
                resolve(token);
            });
        });
    },

    //For cheching multiple roles
    restrict : (...allowedrole) => {
        return(req, res, next) => {
            const userRole = req.payload.role;

            if(!userRole || !allowedrole.includes(userRole)) {
                return next(
                    createError.Forbidden(
                        'Sorry! You are not authorized to access this resource'
                    )
                );
            }

            next();
        }
    }
}


