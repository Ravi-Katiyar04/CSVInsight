import csvtojson from 'csvtojson';
import EmployeeModel from '../models/employee.model.js';

export const importEmployee = async (req, res) => {
    try {
        const employeeData=[];
        csvtojson().fromFile(req.file.path).then(async (data) => {
            data.forEach(async (employee) => {
                employeeData.push({
                    name: employee.NAME,
                    number: employee.NUMBER,
                    address: employee.ADDRESS
                });
            });         
            EmployeeModel.insertMany(employeeData);    
            res.send({status:200, message: 'File successfully', fileType: 'employee'});
        });
    } catch (error) {
        res.send({status:400, message: error.message });
    }
}
