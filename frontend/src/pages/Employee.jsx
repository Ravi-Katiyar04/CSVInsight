
import { useEffect, useState } from 'react';
import EmployeeCard from '../components/EmployeeCard';
import axios from 'axios';

const Employee = () => {
    const [employees, setEmployees] = useState([]); 
    const [filteredEmployees, setFilteredEmployees] = useState([]); 
    const [showFilters, setShowFilters] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/getEmployeeData`);
                setEmployees(response.data);
                setFilteredEmployees(response.data); 
            } catch (error) {
                console.error('Error fetching employees:', error);
            }
        };
        fetchEmployees();
    }, []);

    const applyFilter = (address) => {
        setSelectedAddress(address);
        if (address) {
            const filtered = employees.filter(emp => emp.address === address);
            setFilteredEmployees(filtered);
        } else {
            setFilteredEmployees(employees);
        }
    };

    return (
        <div className='bg-lime-300 h-full min-h-screen flex flex-col items-center py-10 gap-8 relative'>
            {/* Filter Dropdown Button */}
            <div className="relative">
                <button 
                    className='border-2 border-black rounded-md px-4 py-2 bg-gray-300'
                    onClick={() => setShowFilters(!showFilters)}
                >
                    Filter by Address
                </button>

                {/* Dropdown Menu */}
                {showFilters && (
                    <div className="absolute top-12 left-0 bg-white border border-black rounded-md shadow-md flex flex-col z-50">
                        {['Allhabad', 'Lucknow', 'Varanasi'].map(address => (
                            <button 
                                key={address}
                                className={`px-4 py-2 hover:bg-gray-200 ${
                                    selectedAddress === address ? 'bg-gray-500 text-white' : ''
                                }`}
                                onClick={() => {
                                    applyFilter(address);
                                    setShowFilters(false);
                                }}
                            >
                                {address}
                            </button>
                        ))}
                        {/* Clear Filter Option */}
                        <button 
                            className="px-4 py-2 bg-red-400 text-white"
                            onClick={() => {
                                applyFilter(null);
                                setShowFilters(false);
                            }}
                        >
                            Clear Filter
                        </button>
                    </div>
                )}
            </div>

            {/* Employee Cards */}
            <div className="flex flex-wrap gap-4 p-4 justify-center relative z-10">
                {filteredEmployees.map(employee => (
                    <EmployeeCard key={employee._id} employee={employee} />
                ))}
            </div>
        </div>
    );
};

export default Employee;
