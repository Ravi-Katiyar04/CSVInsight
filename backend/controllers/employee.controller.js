import csvtojson from 'csvtojson';
import EmployeeModel from '../models/employee.model.js';



export const importEmployee = async (req, res) => {
    try {
        const employeeData = [];
        csvtojson().fromFile(req.file.path).then(async (data) => {
    
            for (const employee of data) { 
                const existingEmployee = await EmployeeModel.findOne({ number: employee.NUMBER });
            
                if (!existingEmployee) {
                    employeeData.push({
                        name: employee.NAME,
                        number: employee.NUMBER,
                        address: employee.ADDRESS
                    });
                }
            }

            
            await EmployeeModel.insertMany(employeeData);
            res.send({ status: 200, message: 'File successfully', fileType: 'employee' });
        });
    } catch (error) {
        res.send({ status: 400, message: error.message });
    }
}
