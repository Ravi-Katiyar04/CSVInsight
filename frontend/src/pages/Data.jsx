
// export default Data;

import { useEffect, useState } from 'react';
import Card from '../components/Card';
import axios from 'axios';

const Data = () => {
    const [myheaders, setmyHeaders] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [showFieldDropdown, setShowFieldDropdown] = useState(false);
    const [selectedField, setSelectedField] = useState(null);
    const [showValueDropdown, setShowValueDropdown] = useState(false);
    const [uniqueValues, setUniqueValues] = useState([]);
    const [selectedValue, setSelectedValue] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/getData`);

                const nonUniqueHeaders = response.data.headers.filter(header =>
                    !['email', 'id', '_id'].includes(header.toLowerCase())
                );

                setmyHeaders(nonUniqueHeaders);
                setEmployees(response.data.employees);
                setFilteredEmployees(response.data.employees);
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };

        fetchData();
    }, []);

    const applyFilter = (field, value) => {
        if (field && value) {
            const filtered = employees.filter(emp => emp[field] === value);
            setFilteredEmployees(filtered);
        } else {
            setFilteredEmployees(employees);
        }
    };

    const handleFieldSelect = (field) => {
        setSelectedField(field);
        setShowFieldDropdown(false);
        setShowValueDropdown(true);

        const values = [...new Set(employees.map(emp => emp[field]))];
        setUniqueValues(values);
    };

    const handleValueSelect = (value) => {
        setSelectedValue(value);
        setShowValueDropdown(false);
        applyFilter(selectedField, value);
    };

    const clearFilters = () => {
        setFilteredEmployees(employees);
        setSelectedField(null);
        setSelectedValue(null);
        setShowFieldDropdown(false);
        setShowValueDropdown(false);
    };

    return (
        <div className="h-screen relative w-screen p-4 bg-gradient-to-r from-green-200 to-green-300 flex flex-col items-center box-border overflow-x-hidden">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Uploaded Data</h1>
            <div className="w-11/12 md:w-4/5  lg:w-3/4 bg-white shadow-2xl no-scrollbar rounded-lg p-6 overflow-auto">
                <div className=" flex sticky top-0 left-4  z-50 flex-wrap gap-4 mb-6 items-center">
                    <div className="relative">
                        <button
                            className="border border-green-500 rounded-md px-6 py-2 bg-green-100 text-green-700 hover:bg-green-200 transition-colors duration-300 shadow-sm"
                            onClick={() => setShowFieldDropdown(!showFieldDropdown)}
                        >
                            {selectedField ? `Field: ${selectedField}` : 'Filter by Field'}
                        </button>

                        {showFieldDropdown && (
                            <div className="absolute top-12 left-0 bg-white border border-gray-300 rounded-md shadow-lg flex flex-col z-50 transition-all duration-300 max-h-60 overflow-y-auto">
                                {myheaders.map(field => (
                                    <button
                                        key={field}
                                        className={`px-4 py-2 hover:bg-green-100 transition-colors duration-300 text-left ${
                                            selectedField === field ? 'bg-green-500 text-white' : 'text-gray-700'
                                        }`}
                                        onClick={() => handleFieldSelect(field)}
                                    >
                                        {field}
                                    </button>
                                ))}
                                <button
                                    className="px-4 py-2 bg-red-400 text-white hover:bg-red-500 transition-colors duration-300"
                                    onClick={clearFilters}
                                >
                                    Clear Filter
                                </button>
                            </div>
                        )}
                    </div>

                    {selectedField && showValueDropdown && (
                        <div className="relative">
                            <button
                                className="border border-green-500 rounded-md px-6 py-2 bg-green-100 text-green-700 hover:bg-green-200 transition-colors duration-300 shadow-sm"
                                onClick={() => setShowValueDropdown(!showValueDropdown)}
                            >
                                {selectedValue ? `${selectedField}: ${selectedValue}` : `Select ${selectedField} Value`}
                            </button>

                            {showValueDropdown && (
                                <div className="absolute top-12 left-0 bg-white border border-gray-300 rounded-md shadow-lg flex flex-col z-50 transition-all duration-300 max-h-60 overflow-y-auto">
                                    {uniqueValues.map(value => (
                                        <button
                                            key={value}
                                            className={`px-4 py-2 hover:bg-green-100 transition-colors duration-300 text-left ${
                                                selectedValue === value ? 'bg-green-500 text-white' : 'text-gray-700'
                                            }`}
                                            onClick={() => handleValueSelect(value)}
                                        >
                                            {value}
                                        </button>
                                    ))}
                                    <button
                                        className="px-4 py-2 bg-red-400 text-white hover:bg-red-500 transition-colors duration-300"
                                        onClick={() => {
                                            setFilteredEmployees(employees);
                                            setSelectedValue(null);
                                            setShowValueDropdown(false);
                                        }}
                                    >
                                        Clear Selection
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="flex flex-wrap gap-4 p-4 justify-center">
                    {filteredEmployees.map(employee => (
                        <Card key={employee._id} employee={employee} headers={myheaders} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Data;
