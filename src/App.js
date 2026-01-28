import { useState, useEffect } from "react";
import atomone from "./image/atomone.jpg";
import { Routes, Route,  } from "react-router-dom";
import App1 from './App1';
import "./App.css";

function App() {


  
  // 🟢 FORM STATE (POST)
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    department: "",
    job_role: "",
    salary: "",
    plant: "",
  });

  // 🟢 GET DATA STATE
  const [employees, setEmployees] = useState([]);

  // 🔄 HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 📤 POST DATA
  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/employee/save/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      alert(data.message);

      setFormData({
        name: "",
        age: "",
        department: "",
        job_role: "",
        salary: "",
        plant: "",
      });

      
      fetchEmployees();
    } catch (error) {
      alert("Error saving employee");
    }
  };

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

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div>
      {/* HEADER */}
      <header className="container">
        <img src={atomone} alt="atomone-logo" className="logo" />
      </header>

      {/* TITLE */}
      <section className="section">
        <h1>TODO APPLICATION FOR ATOMONE</h1>
        <h2>Employee Information</h2>
      </section>

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

        <button onClick={handleSubmit}>Submit Employee Data</button>
      </div>

  <Routes>
  
  <Route path="/employees" element={<App1 />} />
</Routes>
    
    </div>
  );
}

export default App;
