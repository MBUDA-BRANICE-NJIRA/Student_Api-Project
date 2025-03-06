const mongoose = require("mongoose");

mongoose
    .connect(process.env.MONGODB_URL, { dbName: process.env.DB_NAME })
    .then(() => {
        console.log(`MongoDB connected successfully`);
    })
    .catch((error) => console.log(error.message));
