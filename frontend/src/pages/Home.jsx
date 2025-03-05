
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

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
        <div className="h-screen w-screen p-4 bg-sky-200 flex justify-center items-center box-border overflow-x-hidden ">
            <div className="bg-sky-100 border-2 border-white rounded-2xl flex flex-col gap-6 justify-center items-center shadow-2xl h-fit w-fit p-4">
                <label className="font-semibold text-xl" htmlFor="csvfile">Upload CSV file:</label>
                <input
                    className="border-2 border-black p-1 rounded-lg w-4/5"
                    type="file"
                    name="file"
                    id="csvfile"
                    accept=".csv"
                    onChange={handleFileChange}
                />
                
                <button
                    onClick={handleUpload}
                    className="border-2 border-blue-500 bg-sky-800 text-white px-4 py-2 rounded-lg hover:bg-sky-900"
                >
                    Upload
                </button>

                {message && <p className="text-red-600">{message}</p>}

                <Link
                    to="/teacher-student"
                    className="border-2 border-blue-500 bg-sky-800 text-white px-4 py-2 rounded-lg hover:bg-sky-900"
                >
                    Teachers-Students
                </Link>
            </div>
            
        </div>
    );
};

export default Home;

