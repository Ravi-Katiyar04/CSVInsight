import multer from "multer";
import csvParser from "csv-parser";
import fs from "fs";


// Define expected headers for Employee and Product data
const EMPLOYEE_HEADERS = ["name", "number", "address"];
const PRODUCT_HEADERS = ["name", "flavour", "size", "price"];

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


const detectCSVType = (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ error: "No CSV file uploaded" });
    }

    const filePath = req.file.path;
    let headersChecked = false;

    fs.createReadStream(filePath)
        .pipe(csvParser())
        .on("headers", (headers) => {
            headersChecked = true;
            const lowerHeaders = headers.map((h) => h.toLowerCase());

            if (EMPLOYEE_HEADERS.every((h) => lowerHeaders.includes(h))) {
                req.csvType = "employee";
            } else if (PRODUCT_HEADERS.every((h) => lowerHeaders.includes(h))) {
                req.csvType = "product";
            } else {
                req.csvType = "unknown";
            }

            next();
        })
        .on("end", () => {
            if (!headersChecked) {
                return res.status(400).json({ error: "Invalid CSV format" });
            }
        })
        .on("error", (error) => {
            return res.status(500).json({ error: "Error processing CSV file", details: error.message });
        });
};

// Export the middleware and Multer
export { upload, detectCSVType };
