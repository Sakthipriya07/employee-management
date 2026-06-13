import React, { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  const loadData = async () => {
    const res = await getEmployees();
    setEmployees(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    await deleteEmployee(id);
    toast.success("Employee deleted successfully!");
    loadData();
  };

  return (
    <div style={{ padding: "20px" }}>
      <center><h2>Employee Management System</h2></center>

      <button className="add" onClick={() => navigate("/add")}>
        Add Employee
      </button>

      <table border="1" width="100%" style={{ marginTop: 10 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Role</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>
              <td>{emp.role}</td>
              <td>{emp.salary}</td>
              <td>
                <button className="edit" onClick={() => navigate(`/edit/${emp.id}`)}>
                  Edit
                </button>
                <button className="delete" onClick={() => handleDelete(emp.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;