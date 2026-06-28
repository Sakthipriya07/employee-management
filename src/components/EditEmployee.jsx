import React, { useEffect, useState } from "react";
import { getEmployeeById, updateEmployee } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadEmployee();
  }, []);

  const loadEmployee = async () => {
    try {
      const res = await getEmployeeById(id);
      setForm({
        name: res.data.name || "",
        email: res.data.email || "",
        phone: res.data.phone || "",
        role: res.data.role || ""
      });
    } catch (error) {
      toast.error("Failed to load employee details.");
    }
  };

  const validate = () => {
    let newErrors = {};

    const nameRegex = /^[A-Za-z ]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    // Name 
    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!nameRegex.test(form.name)) {
      newErrors.name = "Only alphabets and spaces are allowed";
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
      newErrors.phone = "Enter a valid 10-digit phone number";
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

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await updateEmployee(id, form);
      toast.success("Employee updated successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to update employee.");
    }
  };

  return (
    <div style={{ padding: "10px" }}>
      <h2 style={{ marginBottom: "10px" }}>Edit Employee</h2>

      <form onSubmit={handleUpdate}>
        
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={form.name}
          onChange={handleChange}
        />
        <p style={{ color: "red" }}>{errors.name}</p>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
        />
        <p style={{ color: "red" }}>{errors.email}</p>
      
        <input
          type="tel"
          name="phone"
          placeholder="Enter Phone Number"
          value={form.phone}
          onChange={handleChange}
        />
        <p style={{ color: "red" }}>{errors.phone}</p>
        
        <input
          type="text"
          name="role"
          placeholder="Enter Role"
          value={form.role}
          onChange={handleChange}
        />
        <p style={{ color: "red" }}>{errors.role}</p>
        
        <button className="save" type="submit">
          Update
        </button>
      </form>
    </div>
  );
}

export default EditEmployee;

