import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Product from "./pages/Product"
import Employee from "./pages/Employee"


const App = () => {
  return (
    <div> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/employee" element={<Employee />} />
      </Routes>
    </div>
  )
}
    
export default App

