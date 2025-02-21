
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

    return (
        <div className='bg-lime-300 h-full min-h-screen flex flex-col items-center py-10 gap-8 relative'>
            <div className="relative flex gap-4">
                <div className="relative">
                    <button
                        className='border-2 border-black rounded-md px-4 py-2 bg-gray-300'
                        onClick={() => setShowFieldDropdown(!showFieldDropdown)}
                    >
                        Filter by Field
                    </button>

                    {showFieldDropdown && (
                        <div className="absolute top-12 left-0 bg-white border border-black rounded-md shadow-md flex flex-col z-50">
                            {myheaders.map(field => (
                                <button
                                    key={field}
                                    className={`px-4 py-2 hover:bg-gray-200 ${selectedField === field ? 'bg-gray-500 text-white' : ''}`}
                                    onClick={() => handleFieldSelect(field)}
                                >
                                    {field}
                                </button>
                            ))}
                            <button
                                className="px-4 py-2 bg-red-400 text-white"
                                onClick={() => {
                                    setFilteredEmployees(employees);
                                    setSelectedField(null);
                                    setSelectedValue(null);
                                    setShowFieldDropdown(false);
                                    setShowValueDropdown(false);
                                }}
                            >
                                Clear Filter
                            </button>
                        </div>
                    )}
                </div>

                {selectedField && showValueDropdown && (
                    <div className="relative">
                        <button
                            className='border-2 border-black rounded-md px-4 py-2 bg-gray-300'
                            onClick={() => setShowValueDropdown(!showValueDropdown)}
                        >
                            Select {selectedField} Value
                        </button>

                        <div className="absolute top-12 left-0 bg-white border border-black rounded-md shadow-md flex flex-col z-50">
                            {uniqueValues.map(value => (
                                <button
                                    key={value}
                                    className={`px-4 py-2 hover:bg-gray-200 ${selectedValue === value ? 'bg-gray-500 text-white' : ''}`}
                                    onClick={() => handleValueSelect(value)}
                                >
                                    {value}
                                </button>
                            ))}
                            <button
                                className="px-4 py-2 bg-red-400 text-white"
                                onClick={() => {
                                    setFilteredEmployees(employees);
                                    setSelectedValue(null);
                                    setShowValueDropdown(false);
                                }}
                            >
                                Clear Selection
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex flex-wrap gap-4 p-4 justify-center relative z-10">
                {filteredEmployees.map(employee => (
                    <Card key={employee._id} employee={employee} headers={myheaders} />
                ))}
            </div>
        </div>
    );
};

export default Data;
