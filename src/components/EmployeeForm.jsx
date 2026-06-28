import React, { useState } from "react";
import { addEmployee } from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function EmployeeForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: ""
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    const nameRegex = /^[A-Za-z ]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    // Name
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!nameRegex.test(form.name)) {
      newErrors.name = "Only alphabets and spaces allowed";
    }

    // Email
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Invalid email format";
    }

    // Phone
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!phoneRegex.test(form.phone)) {
      newErrors.phone = "Enter valid 10-digit mobile number";
    }

    // Role
    if (!form.role.trim()) {
      newErrors.role = "Role is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

    setErrors({
      ...errors,
      [e.target.name]: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await addEmployee(form);
      toast.success("Employee added successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to add employee.");
    }
  };

  return (
    <div style={{ padding: "10px" }}>
      <h2 style={{ marginBottom: "10px" }}>Add Employee</h2>

      <form onSubmit={handleSubmit}>
        
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
        <p style={{ color: "red" }}>{errors.name}</p>

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <p style={{ color: "red" }}>{errors.email}</p>

        <input
          name="phone"
          type="tel"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
        />
        <p style={{ color: "red" }}>{errors.phone}</p>

        <input
          name="role"
          type="text"
          placeholder="Role"
          value={form.role}
          onChange={handleChange}
        />
        <p style={{ color: "red" }}>{errors.role}</p>

        <button className="save" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}

export default EmployeeForm;

