import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    number: {
        type: Number,
    },
    address: {
        type: String,
    }
});

const Employee= mongoose.model("Employee", employeeSchema);

export default Employee;
