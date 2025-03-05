import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Data from "./pages/Data"
import TeacherStudent from "./pages/TeacherStudent"


const App = () => {
  return (
    <div> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/data" element={<Data />} />
        <Route path="/teacher-student" element={<TeacherStudent />} />
      </Routes>
    </div>
  )
}
    
export default App

