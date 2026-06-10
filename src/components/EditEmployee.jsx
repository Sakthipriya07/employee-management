import React, { useEffect, useState } from "react";
import { getEmployeeById, updateEmployee } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    role: "",
    salary: ""
  });

  useEffect(() => {
    loadEmployee();
  }, []);

  const loadEmployee = async () => {
    const res = await getEmployeeById(id);
    setForm(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateEmployee(id, form);
    navigate("/");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Edit Employee</h2>

      <form onSubmit={handleUpdate}>
        <input name="name" value={form.name} onChange={handleChange} />
        <br />

        <input name="email" value={form.email} onChange={handleChange} />
        <br />

        <input name="department" value={form.department} onChange={handleChange} />
        <br />

        <input name="role" value={form.role} onChange={handleChange} />
        <br />

        <input name="salary" value={form.salary} onChange={handleChange} />
        <br />

        <button className="save" type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditEmployee;