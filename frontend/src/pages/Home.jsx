import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        setMessage(""); 
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage("Please select a CSV file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file); 

        try {
            
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/upload`, formData);

            if (response.status === 200) {
                setMessage("File uploaded successfully!");
                setFile(null);
                navigate("/data");

            } else {
                setMessage(`Error: ${response.data.error || "Upload failed"}`);
            }
        } catch (error) {
            console.error("Upload error:", error);
            setMessage("Failed to upload your file. Please try again.");
        }
    };

    return (
        <div className="h-screen w-screen p-4 bg-gradient-to-r from-sky-200 to-sky-300 flex justify-center items-center box-border overflow-x-hidden">
            <div className="bg-white border-2 border-gray-200 rounded-2xl flex flex-col gap-6 justify-center items-center shadow-3xl h-fit w-11/12 md:w-2/3 lg:w-1/2 p-6">
                <label className="font-semibold text-2xl text-gray-700" htmlFor="csvfile">Upload CSV file:</label>
                <input
                    className="border-2 border-gray-300 p-2 rounded-lg w-full md:w-4/5 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    type="file"
                    name="file"
                    id="csvfile"
                    accept=".csv"
                    onChange={handleFileChange}
                />
                
                <button
                    onClick={handleUpload}
                    className="border-2 border-blue-500 bg-gradient-to-r from-sky-800 to-sky-600 text-white px-6 py-3 rounded-lg hover:shadow-lg hover:scale-105 transition-transform duration-300"
                >
                    Upload
                </button>

                {message && <p className="text-red-600 text-center mt-4">{message}</p>}

            </div>
        </div>
    );
};

export default Home;

