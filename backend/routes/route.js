// import express from 'express';
// import path from 'path';
// import bodyParser from 'body-parser';
// import multer from "multer";
// import csvParser from "csv-parser";
// import mongoose from "mongoose";
// import fs from "fs";

// const Router = express();

// Router.use(bodyParser.urlencoded({ extended: true }));

// Router.use(express.static(path.resolve('public')));



// let DynamicModel = {};
// var headers = [];

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './public/uploads');
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     }
// });

// const upload = multer({
//     storage: storage
// });

// Router.post("/upload", upload.single("file"), async (req, res) => {
//     const filePath = req.file.path;

//     headers = [];

//     try {
//         // Read CSV file to extract headers
//         await new Promise((resolve, reject) => {
//             const stream = fs.createReadStream(filePath)
//                 .pipe(csvParser());



//             stream.on("headers", async (headerList) => {
//                 headers.push(...headerList);

//                 if (!headerList.length) return reject("Invalid CSV file");


//                 const schemaDefinition = {};
//                 headers.forEach((header) => {
//                     schemaDefinition[header] = { type: String };
//                 });

//                 schemaDefinition.createdAt = {
//                     type: Date,
//                     default: Date.now,
//                     expires: 86400 // 24 hours in seconds
//                 };

//                 // Define a model with a unique name
//                 DynamicModel = mongoose.model(`DynamicModel${Date.now()}`, new mongoose.Schema(schemaDefinition));

//                 // Read data and insert into MongoDB
//                 const records = [];
//                 await new Promise((resolve, reject) => {
//                     const stream = fs.createReadStream(filePath)
//                         .pipe(csvParser());

//                     stream.on("data", (row) => records.push(row));
//                     stream.on("end", resolve);
//                     stream.on("error", reject);
//                 });

//                 await DynamicModel.insertMany(records);

//                 res.json({ success: true, message: "Data imported successfully" });

//             });

//             stream.on("end", resolve);
//             stream.on("error", reject);
//         });

//         // Create a dynamic schema

//     } catch (error) {
//         console.error(error);
//         res.status(500).send("An error occurred while processing the CSV file.");
//     }

// });


// Router.get('/getData', async (req, res) => {
//     DynamicModel.find()
//         .then(employees => res.json({ success: true, headers, employees }))
//         .catch(err => res.status(400).json({ error: "error fetching employees" + err }));
// });


// export default Router;


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

const dynamicModels = {}; // To hold multiple dynamic models keyed by model name
let latestModelName = ""; // To retrieve last created model in GET route
let headers = [];

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Prevent filename conflicts
    }
});
const upload = multer({ storage });

// Upload CSV and create dynamic model with TTL
Router.post("/upload", upload.single("file"), async (req, res) => {
    const filePath = req.file.path;
    headers = [];

    try {
        const records = [];

        // Step 1: Read headers and records
        await new Promise((resolve, reject) => {
            fs.createReadStream(filePath)
                .pipe(csvParser())
                .on("headers", (headerList) => {
                    headers = headerList;
                })
                .on("data", (row) => records.push(row))
                .on("end", resolve)
                .on("error", reject);
        });

        if (!headers.length || !records.length) {
            return res.status(400).json({ success: false, message: "Invalid or empty CSV file" });
        }

        // Step 2: Build schema
        const schemaDefinition = {};
        headers.forEach(header => {
            schemaDefinition[header] = { type: String };
        });

        schemaDefinition.createdAt = {
            type: Date,
            default: Date.now,
            expires: 86400 // 24 hours
        };

        // Step 3: Create unique model name
        const modelName = "DynamicModel_" + Date.now();
        latestModelName = modelName;

        // Step 4: Create and store the dynamic model
        const dynamicSchema = new mongoose.Schema(schemaDefinition);
        const DynamicModel = mongoose.model(modelName, dynamicSchema);
        dynamicModels[modelName] = DynamicModel;

        // Step 5: Save data
        await DynamicModel.insertMany(records);

        res.json({ success: true, message: "Data imported and will auto-delete in 24 hours", modelName });

    } catch (error) {
        console.error("CSV upload error:", error);
        res.status(500).json({ success: false, message: "Failed to process CSV file" });
    }
});

// Fetch data from latest dynamic model
Router.get('/getData', async (req, res) => {
    try {
        if (!latestModelName || !dynamicModels[latestModelName]) {
            return res.status(404).json({ success: false, message: "No model data found" });
        }

        const data = await dynamicModels[latestModelName].find();
        res.json({ success: true, headers, employees: data });
    } catch (err) {
        res.status(500).json({ success: false, error: "Error fetching data: " + err.message });
    }
});

// Edit data in the latest dynamic model
Router.put('/edit', async (req, res) => {
    console.log(req.body);
    try {
        if (!latestModelName || !dynamicModels[latestModelName]) {
            return res.status(404).json({ success: false, message: "No model data found" });
        }

        const { _id, ...update } = req.body;

        const data = await dynamicModels[latestModelName].findOneAndUpdate({ _id: _id }, update, { new: true });
        res.json({ success: true, message: "Data updated successfully", employee: data });
    } catch (err) {
        res.status(500).json({ success: false, error: "Error updating data: " + err.message });
    }
});

export default Router;
