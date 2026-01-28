# Employee Information Management System

A full-stack web application for managing employee information with CRUD operations, built using React (frontend) and Django REST Framework (backend).

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Contributing](#contributing)


## ✨ Features

- **Create** new employee records with validation
- **Read/View** all employees in a table format
- **Update** existing employee details with inline editing
- **Delete** employee records with confirmation dialog
- Responsive design with clean UI
- RESTful API architecture
- Form validation (age 18-100, positive salary)
- Separate pages for adding and viewing employees
- React Router for navigation
- Real-time data updates
- AtomOne branding with logo

## 🛠 Tech Stack

### Frontend
- **React.js** - JavaScript library for building user interfaces
- **React Router DOM** - Client-side routing
- **Fetch API** - Native HTTP client for API calls
- **React Hooks** - useState, useEffect for state management
- **CSS3** - Custom styling

### Backend
- **Django 6.0+** - High-level Python web framework
- **Django REST Framework** - Toolkit for building Web APIs (serializers)
- **Django CORS Headers** - Handling Cross-Origin Resource Sharing
- **PostgreSQL** - Primary database (can be switched to SQLite)
- **psycopg2** - PostgreSQL adapter for Python
- **Function-based Views** - Custom API views with @csrf_exempt

## 📁 Project Structure

```
MYWE.../
│
├── backend/                           # Django Backend
│   ├── .venv/                        # Virtual environment
│   ├── backend/                      # Main project folder
│   │   ├── __pycache__/
│   │   ├── __init__.py
│   │   ├── asgi.py
│   │   ├── settings.py              # Django settings
│   │   ├── urls.py                  # Main URL configuration
│   │   ├── wsgi.py
│   │   └── config/
│   │
│   ├── employee_app/                 # Employee Django App
│   │   ├── __pycache__/
│   │   ├── migrations/              # Database migrations
│   │   ├── __init__.py
│   │   ├── admin.py                 # Admin panel config
│   │   ├── apps.py
│   │   ├── models.py                # Employee model
│   │   ├── serializers.py           # DRF serializers
│   │   ├── tests.py
│   │   ├── urls.py                  # App URLs
│   │   └── views.py                 # API views
│   │
│   ├── db.sqlite3                    # SQLite database
│   ├── manage.py                     # Django management
│   └── requirements.txt              # Python dependencies
│
└── image/                            # Frontend (React/Vite)
    ├── node_modules/                # Node dependencies
    ├── public/                      # Static files
    ├── src/                         # Source files
    │   ├── image/
    │   │   └── atomone.jpg         # Assets
    │   ├── App.css                 # Main styles
    │   ├── App.js                  # Main component
    │   ├── App.test.js             # Tests
    │   ├── App1.css                # Additional styles
    │   ├── App1.js                 # Additional component
    │   ├── index.css               # Global styles
    │   └── index.js                # Entry point
    │
    ├── package.json                 # NPM configuration
    ├── reportWebVitals.js          # Performance monitoring
    └── setupTests.js               # Test configuration
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Package manager
- **Python** (v3.8 or higher) - [Download](https://www.python.org/)
- **pip** - Python package manager
- **virtualenv** (recommended) - Python virtual environment

## 🚀 Installation

### Backend Setup (Django)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MYWE...
   ```

2. **Create and activate virtual environment**
   ```bash
   cd backend
   
   # Windows
   python -m venv .venv
   .venv\Scripts\activate

   # macOS/Linux
   python3 -m venv .venv
   source .venv/bin/activate
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Required Python packages** (requirements.txt)
   ```txt
   Django>=4.2.0
   djangorestframework>=3.14.0
   django-cors-headers>=4.0.0
   psycopg2-binary>=2.9.0
   ```

5. **PostgreSQL Database Setup**
   
   The project uses PostgreSQL. You need to create the database and user:

   ```bash
   # Login to PostgreSQL
   psql -U postgres

   # Create database and user
   CREATE DATABASE employees;
   CREATE USER employees_user WITH PASSWORD 'amit45';
   ALTER ROLE employees_user SET client_encoding TO 'utf8';
   ALTER ROLE employees_user SET default_transaction_isolation TO 'read committed';
   ALTER ROLE employees_user SET timezone TO 'UTC';
   GRANT ALL PRIVILEGES ON DATABASE employees TO employees_user;

   # Exit PostgreSQL
   \q
   ```

   **Alternative: Use SQLite for Development**
   
   If you prefer SQLite, update `backend/settings.py`:
   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.sqlite3',
           'NAME': BASE_DIR / 'db.sqlite3',
       }
   }
   ```

6. **Run migrations**
   ```bash
   python manage.py makemigrations employee_app
   python manage.py migrate
   ```

7. **Create superuser** (optional, for admin panel)
   ```bash
   python manage.py createsuperuser
   ```

### Frontend Setup (React)

1. **Navigate to frontend directory**
   ```bash
   cd ../image
   ```

2. **Install npm dependencies**
   ```bash
   npm install
   ```

3. **Required packages** (package.json dependencies)
   ```bash
   npm install react react-dom
   npm install react-router-dom
   npm install @testing-library/react @testing-library/jest-dom
   npm install web-vitals
   ```

   **Note**: The project uses native `fetch` API, so no axios is required.

## ⚙️ Configuration

### Backend Configuration

1. **Django Settings** (`backend/settings.py`)
   
   Your project uses **PostgreSQL** database. Here's the complete configuration:

   ```python
   # INSTALLED_APPS
   INSTALLED_APPS = [
       'django.contrib.admin',
       'django.contrib.auth',
       'django.contrib.contenttypes',
       'django.contrib.sessions',
       'django.contrib.messages',
       'django.contrib.staticfiles',
       'corsheaders',
       'employee_app.apps.EmployeeAppConfig',
   ]

   # MIDDLEWARE
   MIDDLEWARE = [
       'corsheaders.middleware.CorsMiddleware',
       'django.middleware.security.SecurityMiddleware',
       'django.contrib.sessions.middleware.SessionMiddleware',
       'django.middleware.common.CommonMiddleware',
       'django.middleware.csrf.CsrfViewMiddleware',
       'django.contrib.auth.middleware.AuthenticationMiddleware',
       'django.contrib.messages.middleware.MessageMiddleware',
       'django.middleware.clickjacking.XFrameOptionsMiddleware',
   ]

   # DATABASE - PostgreSQL Configuration
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.postgresql',
           'NAME': 'employees',
           'USER': 'employees_user',
           'PASSWORD': 'amit45',
           'HOST': 'localhost',
           'PORT': '5432',
       }
   }

   # CORS Settings
   CORS_ALLOW_ALL_ORIGINS = True

   # Static files
   STATIC_URL = 'static/'
   ```

   **Important**: For production, change `DEBUG = False` and update `SECRET_KEY` and `ALLOWED_HOSTS`.

2. **Main URLs Configuration** (`backend/urls.py`)
   ```python
   from django.contrib import admin
   from django.urls import path, include

   urlpatterns = [
       path('admin/', admin.site.urls),
       path('api/employee/', include('employee_app.urls')),
   ]
   ```

3. **Employee Model** (`employee_app/models.py`)
   ```python
   from django.db import models

   class Employee(models.Model):
       name = models.CharField(max_length=100)
       age = models.IntegerField()
       department = models.CharField(max_length=100)
       job_role = models.CharField(max_length=100)
       salary = models.IntegerField()
       plant = models.CharField(max_length=100)

       def __str__(self):
           return self.name
   ```

4. **Serializer** (`employee_app/serializers.py`)
   ```python
   from rest_framework import serializers
   from .models import Employee

   class EmployeeSerializer(serializers.ModelSerializer):
       """
       Serializer for Employee model
       Converts Django model instances to JSON and vice versa
       """
       class Meta:
           model = Employee
           fields = ['id', 'name', 'age', 'department', 'job_role', 'salary', 'plant']

       def validate_age(self, value):
           """Validate age is within reasonable range"""
           if value < 18:
               raise serializers.ValidationError("Employee must be at least 18 years old")
           if value > 100:
               raise serializers.ValidationError("Please enter a valid age")
           return value

       def validate_salary(self, value):
           """Validate salary is positive"""
           if value <= 0:
               raise serializers.ValidationError("Salary must be greater than 0")
           return value
   ```

5. **Views** (`employee_app/views.py`)
   ```python
   import json
   from django.http import JsonResponse
   from django.views.decorators.csrf import csrf_exempt
   from .models import Employee

   @csrf_exempt
   def save_employee(request, employee_id=None):
       if request.method == "POST":
           try:
               data = json.loads(request.body)
               employee = Employee.objects.create(
                   name=data['name'],
                   age=data['age'],
                   department=data['department'],
                   job_role=data['job_role'],
                   salary=data['salary'],
                   plant=data['plant']
               )
               return JsonResponse({
                   "message": "Employee saved successfully",
                   "id": employee.id
               }, status=201)
           except Exception as e:
               return JsonResponse({"error": str(e)}, status=400)

       elif request.method == "GET":
           if employee_id:
               # Get single employee
               try:
                   employee = Employee.objects.get(id=employee_id)
                   data = {
                       "id": employee.id,
                       "name": employee.name,
                       "age": employee.age,
                       "department": employee.department,
                       "job_role": employee.job_role,
                       "salary": employee.salary,
                       "plant": employee.plant,
                   }
                   return JsonResponse(data, status=200)
               except Employee.DoesNotExist:
                   return JsonResponse({"error": "Employee not found"}, status=404)
           else:
               # Get all employees
               employees = Employee.objects.all()
               data = [{
                   "id": emp.id,
                   "name": emp.name,
                   "age": emp.age,
                   "department": emp.department,
                   "job_role": emp.job_role,
                   "salary": emp.salary,
                   "plant": emp.plant,
               } for emp in employees]
               return JsonResponse(data, safe=False, status=200)

       elif request.method in ["PUT", "PATCH"]:
           if not employee_id:
               return JsonResponse({"error": "Employee ID required"}, status=400)
           try:
               data = json.loads(request.body)
               employee = Employee.objects.get(id=employee_id)
               employee.name = data.get('name', employee.name)
               employee.age = data.get('age', employee.age)
               employee.department = data.get('department', employee.department)
               employee.job_role = data.get('job_role', employee.job_role)
               employee.salary = data.get('salary', employee.salary)
               employee.plant = data.get('plant', employee.plant)
               employee.save()
               return JsonResponse({"message": "Employee updated successfully"}, status=200)
           except Employee.DoesNotExist:
               return JsonResponse({"error": "Employee not found"}, status=404)

       elif request.method == 'DELETE':
           try:
               employee = Employee.objects.get(id=employee_id)
               employee.delete()
               return JsonResponse({"message": "Employee deleted successfully"}, status=204)
           except Employee.DoesNotExist:
               return JsonResponse({"error": "Employee not found"}, status=404)
   ```

6. **App URLs** (`employee_app/urls.py`)
   ```python
   from django.urls import path
   from .views import save_employee

   urlpatterns = [
       path('save/', save_employee, name='employee-list'),
       path('save/<int:employee_id>/', save_employee, name='employee-detail'),
   ]
   ```

7. **Admin Configuration** (`employee_app/admin.py`)
   ```python
   from django.contrib import admin
   from .models import Employee

   @admin.register(Employee)
   class EmployeeAdmin(admin.ModelAdmin):
       list_display = ('name', 'age', 'department', 'job_role', 'salary', 'plant')
   ```

8. **App Configuration** (`employee_app/apps.py`)
   ```python
   from django.apps import AppConfig

   class EmployeeAppConfig(AppConfig):
       default_auto_field = 'django.db.models.BigAutoField'
       name = 'employee_app'
       verbose_name = 'Employee Management'
   ```

### Frontend Configuration

The frontend consists of two main components:
- **App.js** - Form to add new employees
- **App1.js** - List, Edit, and Delete employees

1. **Main Entry Point** (`src/index.js`)
   ```javascript
   import React from 'react';
   import ReactDOM from 'react-dom/client';
   import './index.css';
   import App from './App';
   import reportWebVitals from './reportWebVitals';
   import { BrowserRouter } from 'react-router-dom';

   const root = ReactDOM.createRoot(document.getElementById('root'));
   root.render(
     <React.StrictMode>
       <BrowserRouter>
         <App />
       </BrowserRouter>
     </React.StrictMode>
   );

   reportWebVitals();
   ```

2. **Main App Component** (`src/App.js`)
   ```javascript
   import { useState, useEffect } from "react";
   import atomone from "./image/atomone.jpg";
   import { Routes, Route } from "react-router-dom";
   import App1 from './App1';
   import "./App.css";

   function App() {
     // Form State (POST)
     const [formData, setFormData] = useState({
       name: "",
       age: "",
       department: "",
       job_role: "",
       salary: "",
       plant: "",
     });

     // Get Data State
     const [employees, setEmployees] = useState([]);

     // Handle Input Change
     const handleChange = (e) => {
       setFormData({
         ...formData,
         [e.target.name]: e.target.value,
       });
     };

     // POST Data
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

         // Clear form
         setFormData({
           name: "",
           age: "",
           department: "",
           job_role: "",
           salary: "",
           plant: "",
         });

         // Refresh employee list
         fetchEmployees();
       } catch (error) {
         alert("Error saving employee");
       }
     };

     // GET Data
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

     // Load Data on Page Load
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
   ```

3. **Employee List Component** (`src/App1.js`)
   ```javascript
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

     // GET Data
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

     // Load Data on Page Load
     useEffect(() => {
       fetchEmployees();
     }, []);

     // Start Editing
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

     // Handle Input Change
     const handleEditChange = (e) => {
       setEditForm({
         ...editForm,
         [e.target.name]: e.target.value
       });
     };

     // Save Edit (PUT Request)
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
           fetchEmployees();
         } else {
           alert("Failed to update employee");
         }
       } catch (error) {
         console.error("Error updating employee", error);
         alert("Error updating employee");
       }
     };

     // Cancel Edit
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

     // DELETE Employee
     const deleteEmployee = async (id, name) => {
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
           fetchEmployees();
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
                       // EDIT MODE with inline inputs
                       <>
                         <td><input type="text" name="name" value={editForm.name} onChange={handleEditChange} /></td>
                         <td><input type="number" name="age" value={editForm.age} onChange={handleEditChange} /></td>
                         <td><input type="text" name="department" value={editForm.department} onChange={handleEditChange} /></td>
                         <td><input type="text" name="job_role" value={editForm.job_role} onChange={handleEditChange} /></td>
                         <td><input type="number" name="salary" value={editForm.salary} onChange={handleEditChange} /></td>
                         <td><input type="text" name="plant" value={editForm.plant} onChange={handleEditChange} /></td>
                         <td>
                           <button onClick={() => saveEdit(employee.id)}>Save</button>
                           <button onClick={cancelEdit}>Cancel</button>
                         </td>
                       </>
                     ) : (
                       // VIEW MODE
                       <>
                         <td>{employee.name}</td>
                         <td>{employee.age}</td>
                         <td>{employee.department}</td>
                         <td>{employee.job_role}</td>
                         <td>{employee.salary}</td>
                         <td>{employee.plant}</td>
                         <td>
                           <button onClick={() => startEdit(employee)}>Edit</button>
                           <button onClick={() => deleteEmployee(employee.id, employee.name)}>Delete</button>
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
   ```

4. **CSS Styles** (`src/App.css`)
   ```css
   .container {
     display: flex;
     justify-content: space-between;
     flex-direction: row;
   }

   .logo {
       flex-direction: row;
       width: 220px;
       height: auto;
   }

   .section {
    text-align: center;
   }

   .form-container {
     width: 500px;
     margin: 40px auto;
   }

   .form-group {
     display: flex;
     align-items: center;
     margin-bottom: 15px;
   }

   .form-group label {
     width: 160px;
     font-size: 20px;
     font-weight: 600;
   }

   .form-group input {
     flex: 1;
     padding: 10px;
     font-size: 18px;
   }

   button {
     margin-top: 20px;
     padding: 12px;
     font-size: 18px;
     width: 100%;
     cursor: pointer;
   }
   ```

## 🏃 Running the Application

### Start Backend Server

1. **Activate virtual environment** (if not already activated)
   ```bash
   # Navigate to backend folder
   cd backend
   
   # Windows
   .venv\Scripts\activate
   
   # macOS/Linux
   source .venv/bin/activate
   ```

2. **Run Django server**
   ```bash
   python manage.py runserver
   ```

The Django server will run at: `http://localhost:8000`

**Admin Panel**: `http://localhost:8000/admin`
**API Root**: `http://localhost:8000/api/employees/`

### Start Frontend Server

1. **Navigate to image folder** (in a new terminal)
   ```bash
   cd image
   ```

2. **Start React development server**
   ```bash
   npm start
   ```

The React app will run at: `http://localhost:3000`

### Access the Application

- **Frontend Home**: `http://localhost:3000/` - Add new employees
- **Frontend Employee List**: `http://localhost:3000/employees` - View/Edit/Delete employees
- **Backend API Root**: `http://127.0.0.1:8000/api/employee/save/`
- **Admin Panel**: `http://127.0.0.1:8000/admin/` (login with superuser credentials)

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/employee/save/` | Get all employees |
| GET | `/api/employee/save/{id}/` | Get single employee |
| POST | `/api/employee/save/` | Create new employee |
| PUT | `/api/employee/save/{id}/` | Update employee (full update) |
| PATCH | `/api/employee/save/{id}/` | Partial update employee |
| DELETE | `/api/employee/save/{id}/` | Delete employee |

### Example API Requests

**1. Create Employee (POST)**
```bash
curl -X POST http://127.0.0.1:8000/api/employee/save/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "age": 30,
    "department": "Engineering",
    "job_role": "Software Developer",
    "salary": 75000,
    "plant": "Mumbai"
  }'
```

**Response:**
```json
{
  "message": "Employee saved successfully",
  "id": 1
}
```

**2. Get All Employees (GET)**
```bash
curl http://127.0.0.1:8000/api/employee/save/
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "age": 30,
    "department": "Engineering",
    "job_role": "Software Developer",
    "salary": 75000,
    "plant": "Mumbai"
  }
]
```

**3. Get Single Employee (GET)**
```bash
curl http://127.0.0.1:8000/api/employee/save/1/
```

**4. Update Employee (PUT)**
```bash
curl -X PUT http://127.0.0.1:8000/api/employee/save/1/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "age": 31,
    "department": "Engineering",
    "job_role": "Senior Software Developer",
    "salary": 85000,
    "plant": "Mumbai"
  }'
```

**5. Delete Employee (DELETE)**
```bash
curl -X DELETE http://127.0.0.1:8000/api/employee/save/1/
```

**Response:**
```json
{
  "message": "Employee deleted successfully"
}
```

## 💡 Usage

### Adding Employees
1. Navigate to the home page (`http://localhost:3000`)
2. Fill in the employee form with:
   - Name
   - Age
   - Department
   - Job Role
   - Salary
   - Plant
3. Click "Submit Employee Data" button
4. Employee will be saved and form will be cleared

### Viewing Employees
1. Navigate to `/employees` route (`http://localhost:3000/employees`)
2. View all employees in a table format
3. Click "Back to Add Employee" to return to the form

### Editing Employees
1. Go to the employee list page
2. Click the "Edit" button on any employee row
3. The row will become editable with input fields
4. Modify the fields as needed
5. Click "Save" to update the employee
6. Click "Cancel" to discard changes

### Deleting Employees
1. Go to the employee list page
2. Click the "Delete" button on any employee row
3. Confirm the deletion in the popup dialog
4. Employee will be permanently removed

### Navigation
- **Home Page (/)**: Add new employees
- **Employee List (/employees)**: View, edit, and delete employees

## 🧪 Testing

### Backend Tests
The project includes comprehensive test cases in `employee_app/tests.py`:

```bash
# Run all tests
python manage.py test

# Run specific test
python manage.py test employee_app.tests.EmployeeModelTest
python manage.py test employee_app.tests.EmployeeAPITest
```

**Test Coverage:**
- Employee model creation and string representation
- GET all employees
- GET single employee
- POST create employee
- PUT update employee
- DELETE employee

### Frontend Tests
Basic React component tests are available in `App.test.js`:

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## 🎨 Project Assets

### Logo
The project uses the AtomOne company logo (`atomone.jpg`) which should be placed in:
```
image/src/image/atomone.jpg
```

Make sure to add your logo file to this location for proper display.

## 🔮 Features to Implement (Future Enhancements)

- [ ] User Authentication and Authorization
- [ ] Pagination for large employee lists
- [ ] Advanced filtering and sorting
- [ ] Search functionality
- [ ] Export to CSV/Excel
- [ ] Import employees from CSV
- [ ] Employee profile pictures
- [ ] Dashboard with analytics and charts
- [ ] Email notifications for new employees
- [ ] Role-based access control (Admin, Manager, HR)
- [ ] Employee attendance tracking
- [ ] Salary history and increments
- [ ] Department management
- [ ] Plant/Location management
- [ ] Mobile responsive improvements

## 🐛 Troubleshooting

### PostgreSQL Connection Issues
If you encounter database connection errors:

```bash
# Check if PostgreSQL is running
# Windows
pg_ctl status

# macOS
brew services list

# Linux
sudo systemctl status postgresql

# Start PostgreSQL if not running
# Windows
pg_ctl start

# macOS
brew services start postgresql

# Linux
sudo systemctl start postgresql
```

**Common Errors:**
- `FATAL: password authentication failed`: Check your password in `settings.py`
- `could not connect to server`: Ensure PostgreSQL is running
- `database "employees" does not exist`: Create the database using the setup commands above

### CORS Issues
If you encounter CORS errors:
- Ensure `django-cors-headers` is installed
- Check `CORS_ALLOWED_ORIGINS` in `settings.py`
- Verify the frontend is running on the allowed origin

### Database Issues
```bash
# Reset database
python manage.py flush
python manage.py migrate
```

### Port Already in Use
```bash
# Backend (change port)
python manage.py runserver 8001

# Frontend (change port)
PORT=3001 npm start
```

## 📝 Environment Variables

Create `.env` file in backend directory:
```env
SECRET_KEY=your-secret-key
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3
ALLOWED_HOSTS=localhost,127.0.0.1
```

## 📝 Environment Variables

For better security, create a `.env` file in the backend directory:

```env
# Django Settings
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database Settings
DB_NAME=employees
DB_USER=employees_user
DB_PASSWORD=amit45
DB_HOST=localhost
DB_PORT=5432

# CORS Settings
CORS_ALLOW_ALL_ORIGINS=True
```

Then update `settings.py` to use environment variables:

```python
import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv('SECRET_KEY', 'your-default-secret-key')
DEBUG = os.getenv('DEBUG', 'False') == 'True'
ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', 'localhost').split(',')

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DB_NAME', 'employees'),
        'USER': os.getenv('DB_USER', 'employees_user'),
        'PASSWORD': os.getenv('DB_PASSWORD', 'amit45'),
        'HOST': os.getenv('DB_HOST', 'localhost'),
        'PORT': os.getenv('DB_PORT', '5432'),
    }
}
```

Install python-dotenv:
```bash
pip install python-dotenv
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Important Notes

### Django Version
This project uses **Django 6.0.1**, which is the latest version. If you encounter compatibility issues:

```bash
# Check your Django version
python -m django --version

# Install specific Django version
pip install Django==6.0.1
```

### Database Configuration
- **Production**: Uses PostgreSQL for better performance and scalability
- **Development**: Can switch to SQLite for easier setup (see installation instructions)

### Security Notes
⚠️ **Important for Production:**
- Change `SECRET_KEY` in `settings.py`
- Set `DEBUG = False`
- Update `ALLOWED_HOSTS` with your domain
- Change database password from default
- Use environment variables for sensitive data

### CSRF Protection
The project uses `@csrf_exempt` decorator for API views. For production, consider:
- Implementing proper CSRF token handling
- Using Django REST Framework's authentication classes
- Adding API authentication (JWT, Token, etc.)

