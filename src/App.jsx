import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";
import EditEmployee from "./components/EditEmployee";

function App() {
  return (
    <div className="container">
     <Routes>
       <Route path="/" element={<EmployeeList />} />
       <Route path="/add" element={<EmployeeForm />} />
       <Route path="/edit/:id" element={<EditEmployee />} />
     </Routes>
    </div>
  );
}

export default App;