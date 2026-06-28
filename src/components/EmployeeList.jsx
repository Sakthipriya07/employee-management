import React, { useEffect, useState } from "react";
import { getEmployees, deleteEmployee } from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      const res = await getEmployees();
      setEmployees(res.data);
    } catch (error) {
      toast.error("Failed to load employees");
    }
  };

  useEffect(() => {
    loadData();
  }, []);


  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) return;

    try {
      await deleteEmployee(id);
      toast.success("Employee deleted successfully!");
      loadData();
    } catch (error) {
      toast.error("Failed to delete employee");
    }
  };


  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <div>

      <div className="header-card">
        <center>
          <h2>Employee Management System</h2>
          <p>manage employee records using react crud</p>
        </center>
      </div>

      <div className="toolbar">

        <input type="text"
          placeholder="Search employee by name, email, position..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="add-btn" onClick={() => navigate("/add")}>
          Add Employee
        </button>

      </div>


      <div className="table-card">
        <table style={{ marginTop: 10 }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>PHONE</th>
              <th>POSITION</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp, index) => (
                <tr key={emp.id}>
                  <td>{index + 1}</td>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.phone}</td>
                  <td>{emp.role}</td>
                  <td>
                    <button className="edit-btn" onClick={() => navigate(`/edit/${emp.id}`)}>
                      Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(emp.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default EmployeeList;