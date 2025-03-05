const express = require('express');
const app = express();








// Middleware
app.listen(process.env.PORT || 3000, () => {
    console.log("Now listening for request on :http://localhost:3000");
});