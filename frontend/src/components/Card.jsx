
import { useState, useEffect } from 'react';

const Card = (prop) => {
    const [employee, setEmployee] = useState({});
    const [header, setHeader] = useState([])

    useEffect(() => {
        setHeader(prop.headers);
        setEmployee(prop.employee);
    }, []);

    return (
        <div className="max-w-60 border-2 border-black rounded-lg shadow-lg relative hover:bg-gray-200 hover:z-10 hover:scale-105 transition-transform duration-300">
            <div className="p-4">
                {header.map((field, index) => (
                    <p key={index} className="text-gray-600 mt-2">
                        {field} : {employee[field]}
                    </p>
                ))}
            </div>
        </div>
    );
}


export default Card;

