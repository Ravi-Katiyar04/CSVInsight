import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import multer from "multer";
import csvParser from "csv-parser";
import mongoose from "mongoose";
import fs from "fs";

const Router = express();

Router.use(bodyParser.urlencoded({ extended: true }));

Router.use(express.static(path.resolve('public')));



let DynamicModel = {};
var headers = [];

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: storage
});

Router.post("/upload", upload.single("file"), async (req, res) => {
    const filePath = req.file.path;

    headers = [];

    try {
        // Read CSV file to extract headers
        await new Promise((resolve, reject) => {
            const stream = fs.createReadStream(filePath)
                .pipe(csvParser());



            stream.on("headers", async (headerList) => {
                headers.push(...headerList);

                if (!headerList.length) return reject("Invalid CSV file");


                const schemaDefinition = {};
                headers.forEach((header) => {
                    schemaDefinition[header] = { type: String }; // Defaulting all fields to String
                });

                schemaDefinition.createdAt = {
                    type: Date,
                    default: Date.now,
                    expires: 86400 // 24 hours in seconds
                };

                // Define a model with a unique name
                DynamicModel = mongoose.model(`DynamicModel${Date.now()}`, new mongoose.Schema(schemaDefinition));

                // Read data and insert into MongoDB
                const records = [];
                await new Promise((resolve, reject) => {
                    const stream = fs.createReadStream(filePath)
                        .pipe(csvParser());

                    stream.on("data", (row) => records.push(row));
                    stream.on("end", resolve);
                    stream.on("error", reject);
                });

                await DynamicModel.insertMany(records);

                res.json({ success: true, message: "Data imported successfully" });

            });

            stream.on("end", resolve);
            stream.on("error", reject);
        });

        // Create a dynamic schema

    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while processing the CSV file.");
    }

});


Router.get('/getData', async (req, res) => {
    DynamicModel.find()
        .then(employees => res.json({ success: true, headers, employees }))
        .catch(err => res.status(400).json({ error: "error fetching employees" + err }));
});


export default Router;