
// import { useState, useEffect } from 'react';

// const Card = (prop) => {
//     const [employee, setEmployee] = useState({});
//     const [header, setHeader] = useState([])
//     const [showEdit, setShowEdit] = useState(false);

//     useEffect(() => {
//         setHeader(prop.headers);
//         setEmployee(prop.employee);
//     }, []);

//     useEffect(() => {
//         const clickOutside = (e) => {
//             if (!e.target.closest('.card')) {
//                 setShowEdit(false);
//             }
//         }
//         window.addEventListener('click', clickOutside);
//         return () => window.removeEventListener('click', clickOutside);
//     }, []);

//     return (
//         <div className="max-w-60 border-2 border-black rounded-lg shadow-lg relative hover:bg-gray-200 hover:z-10 hover:scale-105 transition-transform duration-300 card">
//             <div className="p-4">
//                 {header.map((field, index) => (
//                     <p key={index} className="text-gray-600 mt-2">
//                         {field} : {employee[field]}
//                     </p>
//                 ))}
//             </div>
//             <div className="p-4 flex justify-end">
//                 <button
//                     className="px-2 py-1 border-2 border-black rounded-lg hover:bg-gray-200"
//                     onClick={() => setShowEdit(!showEdit)}
//                 >
//                     Edit
//                 </button>
//             </div>
//             {showEdit && <div className="absolute inset-0 bg-white bg-opacity-50 z-10">
//                 <div className="absolute inset-0 flex justify-center items-center p-4">
//                     <div className="bg-white p-4 rounded-lg shadow-lg">
//                         <h2 className="text-2xl font-bold">Edit {employee.name}</h2>
//                         <form onSubmit={(e) => {
//                             e.preventDefault();
//                             prop.edit(employee);
//                             setShowEdit(false);
//                         }}>
//                             {header.map((field, index) => (
//                                 <label key={index} className="block text-lg">
//                                     {field}
//                                     <input
//                                         type="text"
//                                         value={employee[field]}
//                                         onChange={(e) => setEmployee({
//                                             ...employee,
//                                             [field]: e.target.value
//                                         })}
//                                         className="block border-2 border-black rounded-lg p-2 w-full"
//                                     />
//                                 </label>
//                             ))}
//                             <button type="submit" className="bg-green-500 p-2 rounded-lg text-white">Save</button>
//                         </form>
//                     </div>
//                 </div>
//             </div>}
//         </div>
//     );
// }


// export default Card;


import { useState, useEffect } from 'react';
import axios from 'axios';

const Card = (prop) => {
    const [employee, setEmployee] = useState({});
    const [header, setHeader] = useState([])
    const [showEdit, setShowEdit] = useState(false);

    useEffect(() => {
        setHeader(prop.headers);
        setEmployee(prop.employee);
    }, []);

    useEffect(() => {
        const clickOutside = (e) => {
            if (!e.target.closest('.card')) {
                setShowEdit(false);
            }
        }
        window.addEventListener('click', clickOutside);
        return () => window.removeEventListener('click', clickOutside);
    }, []);

    const handleSave = async () => {
        try {
            const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/edit`, employee);
            if (response.status === 200) {
                setShowEdit(false);
                // prop.onEdit(employee);
            }
        } catch (error) {
            console.error("Error saving changes:", error);
        }
    }

    return (
        <div className="max-w-60 border-2 border-black rounded-lg shadow-lg relative hover:bg-gray-200 hover:z-10 hover:scale-105 transition-transform duration-300 card">
            <div className="p-4">
                {header.map((field, index) => (
                    <p key={index} className="text-gray-600 mt-2">
                        {field} : {employee[field]}
                    </p>
                ))}
            </div>
            <div className="p-4 flex justify-end">
                <button
                    className="px-2 py-1 border-2 border-black rounded-lg hover:bg-gray-200"
                    onClick={() => setShowEdit(!showEdit)}
                >
                    Edit
                </button>
            </div>
            {showEdit && <div className="absolute inset-0 bg-white bg-opacity-50 z-10">
                <div className="absolute inset-0 flex justify-center items-center p-4">
                    <div className="bg-white p-4 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold">Edit {employee.name}</h2>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleSave();
                        }}>
                            {header.map((field, index) => (
                                <label key={index} className="block text-lg">
                                    {field}
                                    <input
                                        type="text"
                                        value={employee[field]}
                                        onChange={(e) => setEmployee({
                                            ...employee,
                                            [field]: e.target.value
                                        })}
                                        className="block border-2 border-black rounded-lg p-2 w-full"
                                    />
                                </label>
                            ))}
                            <button type="submit"  className="bg-green-500 p-2 rounded-lg text-white">Save</button>
                        </form>
                    </div>
                </div>
            </div>}
        </div>
    );
}


export default Card;

