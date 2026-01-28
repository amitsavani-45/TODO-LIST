import { useState, useEffect } from "react";
import atomone from "./image/atomone.jpg";
import "./App1.css";
import { Link } from "react-router-dom";

function App1() {
  const [employees, setEmployees] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    age: "",
    department: "",
    job_role: "",
    salary: "",
    plant: ""
  });

  // 📥 GET DATA
  const fetchEmployees = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/employee/save/"
      );
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees", error);
    }
  };

  // 🚀 LOAD DATA ON PAGE LOAD
  useEffect(() => {
    fetchEmployees();
  }, []);

  // ✏️ START EDITING
  const startEdit = (employee) => {
    setEditingId(employee.id);
    setEditForm({
      name: employee.name,
      age: employee.age,
      department: employee.department,
      job_role: employee.job_role,
      salary: employee.salary,
      plant: employee.plant
    });
  };

  // 📝 HANDLE INPUT CHANGE
  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  // 💾 SAVE EDIT
  const saveEdit = async (id) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/employee/save/${id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editForm),
        }
      );

      if (response.ok) {
        alert("Employee updated successfully!");
        setEditingId(null);
        fetchEmployees(); // Refresh the list
      } else {
        alert("Failed to update employee");
      }
    } catch (error) {
      console.error("Error updating employee", error);
      alert("Error updating employee");
    }
  };

  // ❌ CANCEL EDIT
  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({
      name: "",
      age: "",
      department: "",
      job_role: "",
      salary: "",
      plant: ""
    });
  };

  // 🗑️ DELETE EMPLOYEE
  const deleteEmployee = async (id, name) => {
    // Confirm before deleting
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${name}?`
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/employee/save/${id}/`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("Employee deleted successfully!");
        fetchEmployees(); // Refresh the list
      } else {
        alert("Failed to delete employee");
      }
    } catch (error) {
      console.error("Error deleting employee", error);
      alert("Error deleting employee");
    }
  };

 
  return (
    <div>
      <header className="container1">
        <img src={atomone} alt="atomone-logo" className="logo1" />
      </header>

      {/* Navigation */}
      <nav style={{ padding: '20px', backgroundColor: '#f0f0f0', marginBottom: '20px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#007bff' }}>
          ← Back to Add Employee
        </Link>
      </nav>

      {/* Employee List */}
      <div style={{ padding: '20px' }}>
        <h1>Employee List</h1>
        
        {employees.length === 0 ? (
          <p>No employees found. Add some employees first!</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#007bff', color: 'white' }}>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Name</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Age</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Department</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Job Role</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Salary</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Plant</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  {editingId === employee.id ? (
                    // EDIT MODE
                    <>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                        <input
                          type="text"
                          name="name"
                          value={editForm.name}
                          onChange={handleEditChange}
                          style={{ width: '100%', padding: '5px' }}
                        />
                      </td>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                        <input
                          type="number"
                          name="age"
                          value={editForm.age}
                          onChange={handleEditChange}
                          style={{ width: '100%', padding: '5px' }}
                        />
                      </td>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                        <input
                          type="text"
                          name="department"
                          value={editForm.department}
                          onChange={handleEditChange}
                          style={{ width: '100%', padding: '5px' }}
                        />
                      </td>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                        <input
                          type="text"
                          name="job_role"
                          value={editForm.job_role}
                          onChange={handleEditChange}
                          style={{ width: '100%', padding: '5px' }}
                        />
                      </td>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                        <input
                          type="number"
                          name="salary"
                          value={editForm.salary}
                          onChange={handleEditChange}
                          style={{ width: '100%', padding: '5px' }}
                        />
                      </td>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                        <input
                          type="text"
                          name="plant"
                          value={editForm.plant}
                          onChange={handleEditChange}
                          style={{ width: '100%', padding: '5px' }}
                        />
                      </td>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                        <button
                          onClick={() => saveEdit(employee.id)}
                          style={{
                            padding: '5px 10px',
                            marginRight: '5px',
                            backgroundColor: '#28a745',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            borderRadius: '3px'
                          }}
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          style={{
                            padding: '5px 10px',
                            backgroundColor: '#6c757d',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            borderRadius: '3px'
                          }}
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    // VIEW MODE
                    <>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>{employee.name}</td>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>{employee.age}</td>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>{employee.department}</td>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>{employee.job_role}</td>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>{employee.salary}</td>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>{employee.plant}</td>
                      <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                        <button
                          onClick={() => startEdit(employee)}
                          style={{
                            padding: '5px 10px',
                            marginRight: '5px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            borderRadius: '3px'
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteEmployee(employee.id, employee.name)}
                          style={{
                            padding: '5px 10px',
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer',
                            borderRadius: '3px'
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App1;