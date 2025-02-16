import csvtojson from 'csvtojson';
import Employee from '../models/employee.model.js';

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
            Employee.insertMany(employeeData);    
            res.send({status:200, message: 'File successfully' });
        });
    } catch (error) {
        res.send({status:400, message: error.message });
    }
}
