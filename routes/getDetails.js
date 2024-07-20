//API to get all the details of every user

import express from 'express';
import Alumni from '../database/studentSchema.js';

const router = express.Router();

router.get('/get-details', async (req, res) => {
    try {
        const allDetails = await Alumni.find();
        res.status(200).send(allDetails);
    } catch (error) {
        console.error('Error fetching details:', error);
        res.status(500).send('Error fetching details.');
    }
}
);

export default router; 
