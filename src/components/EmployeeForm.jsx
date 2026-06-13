import React, { useState } from "react";
import { addEmployee } from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function EmployeeForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    role: "",
    salary: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addEmployee(form);
    toast.success("Employee added successfully!");
    navigate("/");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Add Employee</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} />
        <br />

        <input name="email" placeholder="Email" onChange={handleChange} />
        <br />

        <input name="department" placeholder="Department" onChange={handleChange} />
        <br />

        <input name="role" placeholder="Role" onChange={handleChange} />
        <br />

        <input name="salary" placeholder="Salary" onChange={handleChange} />
        <br />

        <button className="save" type="submit">Save</button>
      </form>
    </div>
  );
}

export default EmployeeForm;