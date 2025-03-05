import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TeacherStudent = () => {
    const [studentFile, setStudentFile] = useState(null);
    const [teacherFile, setTeacherFile] = useState(null);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();


    const handleFileChange = (event) => {
        const { name, files } = event.target;
        if (name === "studentFile") {
            setStudentFile(files[0]);
        } else if (name === "teacherFile") {
            setTeacherFile(files[0]);
        }
        setMessage("");
    };

    const handleUpload = async () => {
        if (!studentFile || !teacherFile) {
            alert("Please upload both files before submitting.");
            return;
        }

        const formData = new FormData();
        formData.append("studentFile", studentFile);
        formData.append("teacherFile", teacherFile);
        try {

            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/upload-student-teacher`, formData);

            if (response.status === 200) {
                setMessage("File uploaded successfully!");
                setStudentFile(null);
                setTeacherFile(null);
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
                <h1 className="font-semibold text-xl">UPLOAD FILES</h1>
                <div className="flex flex-col justify-center items-center gap-6">
                    <div className="flex flex-col justify-center items-center">
                        <label className="font-semibold text-base" htmlFor="csvfile">Upload teachers CSV file:</label>
                        <input
                            className="border-2 border-black p-1 rounded-lg w-4/5"
                            type="file"
                            name="teacherFile"
                            id="csvfile"
                            accept=".csv"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <label className="font-semibold text-base" htmlFor="csvfile">Upload student CSV file:</label>
                        <input
                            className="border-2 border-black p-1 rounded-lg w-4/5"
                            type="file"
                            name="studentFile"
                            id="csvfile"
                            accept=".csv"
                            onChange={handleFileChange}
                        />
                    </div>

                </div>

                <button
                    onClick={handleUpload}
                    className="border-2 border-blue-500 bg-sky-800 text-white px-4 py-2 rounded-lg hover:bg-sky-900"
                >
                    Upload
                </button>

                {message && <p className="text-red-600">{message}</p>}

            </div>

        </div>

    );
}

export default TeacherStudent
