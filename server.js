import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import csvUploadRoutes from './routes/csvUpload.js';
import getDetailsRoutes from './routes/getDetails.js';

// Import the database connection
import connectDB from './database/database.js';

dotenv.config({
    path: './.env',
});

const app = express();
app.use(express.json());

// Connect to the database
connectDB();

//cors
const corsConfig = {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsConfig));

// Define routes
// app.use('', (req, res) => {
//     res.send('Welcome to the Alumni Portal API');
// });
app.use('/api', csvUploadRoutes);
app.use('/api', getDetailsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
