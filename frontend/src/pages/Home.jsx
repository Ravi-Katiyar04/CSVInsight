

const Home = () => {
    return (
        <div className="h-screen w-screen bg-sky-200 flex justify-center items-center">
            <div className="bg-sky-100 border-2 border-white rounded-2xl flex flex-col gap-6 justify-center items-center shadow-2xl h-3/5 w-2/4">
                <label className="font-semibold text-xl" htmlFor="csvfile">Upload CSV file:</label>
                <input className=" border-2 border-black p-1 rounded-lg" type="file" name="csvfile" id="csvfile" />
                <div className="flex gap-4">
                    <button className="border-2 border-blue-500 bg-sky-800 text-white p-1 rounded-lg">EmployeeCSV</button>
                    <button className="border-2 border-blue-500 bg-sky-700 text-white p-1 rounded-lg">ProductCSV</button>
                </div>
            </div>
        </div>
    )
}

export default Home
