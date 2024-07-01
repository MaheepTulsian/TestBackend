import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// Import the database connection
import connectDB from './database/database.js';

dotenv.config({
    path: './.env',
});

const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to the database
connectDB();

// Define routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
