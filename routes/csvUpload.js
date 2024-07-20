import express from 'express';
import multer from 'multer';
import csv from 'csv-parser';
import fs from 'fs';
import moment from 'moment';
import Alumni from '../database/studentSchema.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Parse CSV and convert to JSON
const parseCsv = (filePath) => {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => {
                // Convert registeredOnAlumniPortal from "Yes"/"No" to Boolean
                data.registeredOnAlumniPortal = data.registeredOnAlumniPortal.toLowerCase() === 'yes';
                // Parse date of birth (dob) to ISO format
                data.dob = moment(data.dob, 'DD-MM-YYYY').toISOString();
                results.push(data);
            })
            .on('end', () => resolve(results))
            .on('error', (err) => reject(err));
    });
};

router.post('/upload-csv', upload.single('file'), async (req, res) => {
    try {
        const filePath = req.file.path;
        console.log('Uploaded file path:', filePath);
        const newData = await parseCsv(filePath);
        console.log('Parsed CSV Data:', newData);
        
        for (const entry of newData) {
            const existingEntry = await Alumni.findOne({ collegeId: entry.collegeId });

            if (existingEntry) {
                // Compare fields and update if necessary
                for (const key in entry) {
                    if (entry[key] !== existingEntry[key]) {
                        existingEntry[key] = entry[key];
                    }
                }
                await existingEntry.save();
            } else {
                // Create new entry if not exists
                const newAlumni = new Alumni(entry);
                await newAlumni.save();
            }
        }

        // Remove the uploaded file after processing
        fs.unlinkSync(filePath);

        res.status(200).send('CSV data processed successfully.');
    } catch (error) {
        console.error('Error processing CSV data:', error);
        res.status(500).send('Error processing CSV data.');
    }
});

export default router;
