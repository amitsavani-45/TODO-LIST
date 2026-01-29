import { useState, useEffect } from "react";
import atomone from "./image/atomone.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get employee data from navigation state (if editing)
  const employeeToEdit = location.state?.employee;
  
  // 🟢 FORM STATE (POST/PUT)
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    department: "",
    job_role: "",
    salary: "",
    plant: "",
  });

  // 🔄 POPULATE FORM IF EDITING
  useEffect(() => {
    if (employeeToEdit) {
      setFormData({
        name: employeeToEdit.name,
        age: employeeToEdit.age,
        department: employeeToEdit.department,
        job_role: employeeToEdit.job_role,
        salary: employeeToEdit.salary,
        plant: employeeToEdit.plant,
      });
    }
  }, [employeeToEdit]);

  // 🔄 HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 📤 POST/PUT DATA
  const handleSubmit = async () => {
    try {
      let response;
      
      if (employeeToEdit) {
        // UPDATE EXISTING EMPLOYEE
        response = await fetch(
          `http://127.0.0.1:8000/api/employee/save/${employeeToEdit.id}/`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
      } else {
        // CREATE NEW EMPLOYEE
        response = await fetch(
          "http://127.0.0.1:8000/api/employee/save/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
      }

      const data = await response.json();
      
      if (response.ok) {
        alert(employeeToEdit ? "Employee updated successfully!" : data.message);
        
        // Reset form
        setFormData({
          name: "",
          age: "",
          department: "",
          job_role: "",
          salary: "",
          plant: "",
        });
        
        // Navigate back to employee list
        navigate("/employees");
      } else {
        alert("Error saving employee");
      }
    } catch (error) {
      alert("Error saving employee");
    }
  };

  // ❌ CANCEL EDIT
  const handleCancel = () => {
    // Reset form
    setFormData({
      name: "",
      age: "",
      department: "",
      job_role: "",
      salary: "",
      plant: "",
    });
    
    // Navigate back to employee list
    navigate("/employees");
  };

  return (
    <div>
      {/* HEADER */}
      <header className="container">
        <img src={atomone} alt="atomone-logo" className="logo" />
      </header>

      {/* TITLE */}
      <section className="section">
        <h1>TODO APPLICATION FOR ATOMONE</h1>
        <h2>{employeeToEdit ? "Edit Employee Information" : "Employee Information"}</h2>
      </section>

      {/* Navigation Link */}
      <nav style={{ padding: '20px', textAlign: 'center' }}>
        <Link 
          to="/employees" 
          style={{ 
            textDecoration: 'none', 
            color: '#007bff',
            fontSize: '18px',
            fontWeight: 'bold'
          }}
        >
          View Employee List →
        </Link>
      </nav>

      {/* FORM */}
      <div className="form-container">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Department</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Job Role</label>
          <input
            type="text"
            name="job_role"
            value={formData.job_role}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Salary</label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Plant</label>
          <input
            type="text"
            name="plant"
            value={formData.plant}
            onChange={handleChange}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handleSubmit}>
            {employeeToEdit ? "Update Employee Data" : "Submit Employee Data"}
          </button>
          
          {employeeToEdit && (
            <button 
              onClick={handleCancel}
              style={{
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                cursor: 'pointer',
                borderRadius: '5px'
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;