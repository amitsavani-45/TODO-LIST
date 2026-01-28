import { useState, useEffect } from "react";
import atomone from "./image/atomone.jpg";
import "./App1.css";
import { Link } from "react-router-dom";

function App1() {
  const [employees, setEmployees] = useState([]);

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
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={index}>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{employee.name}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{employee.age}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{employee.department}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{employee.job_role}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{employee.salary}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{employee.plant}</td>
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