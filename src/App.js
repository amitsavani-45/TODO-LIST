import atomone from './image/atomone.jpg';
import './App.css';

function App() {
  return (
    <div>
      <header className="container">
        <img src={atomone}  alt="atomone-logo" className="logo"  />
       
      </header>

      <section className="section">
         <h1>TODO APPLICATION FOR ATOMONE</h1>
        <h1>Information of Employee</h1>
      </section>
   
  <div className="form-container">
  <div className="form-group">
    <label>Name</label>
    <input type="text" name="name" />
  </div>

  <div className="form-group">
    <label>Age</label>
    <input type="number" name="age" />
  </div>

  <div className="form-group">
    <label>Department</label>
    <input type="text" name="department" />
  </div>

  <div className="form-group">
    <label>Job Role</label>
    <input type="text" name="jobRole" />
  </div>

  <div className="form-group">
    <label>Salary</label>
    <input type="number" name="salary" />
  </div>

  <div className="form-group">
    <label>Plant</label>
    <input type="text" name="plant" />
  </div>

  <button type="submit">Submit Employee Data</button>
</div>


      </div>
      
  );
   
}

export default App;
