import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    }
});

const EmployeeModel= mongoose.model("employee", employeeSchema);

export default EmployeeModel;
