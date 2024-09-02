const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes/index');

const app = express();


// Enable CORS with credentials and frontend URL from environment variables
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));

// Middleware for parsing JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Set timeout to 2 minutes (120000 milliseconds)
app.use((req, res, next) => {
    res.setTimeout(300000, () => { // 120 seconds
        console.log('Request timed out.');
        res.status(408).send('Request timed out.');
    });
    next();
});

// Use the API router
app.use("/api", router);

// Set PORT, using environment variable or defaulting to 8080
const PORT = process.env.PORT || 8080;

// Connect to the database and start the server
connectDB().then(() => {
    console.log("Connected to the database");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.error('Database connection failed:', err);
});
