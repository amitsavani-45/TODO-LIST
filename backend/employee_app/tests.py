from django.test import TestCase
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Employee


# =========================
# MODEL TESTS
# =========================
class EmployeeModelTest(TestCase):
    """Test cases for Employee model"""

    def setUp(self):
        self.employee = Employee.objects.create(
            name="John Doe",
            age=30,
            department="IT",
            job_role="Software Engineer",
            salary=75000.00,
            plant="Mumbai"
        )

    def test_employee_creation(self):
        """Employee object created correctly"""
        self.assertEqual(self.employee.name, "John Doe")
        self.assertEqual(self.employee.age, 30)
        self.assertEqual(
            str(self.employee),
            "John Doe - Software Engineer"
        )


# =========================
# API TESTS
# =========================
class EmployeeAPITest(APITestCase):
    """Test cases for Employee API"""

    def setUp(self):
        self.employee_data = {
            "name": "Jane Smith",
            "age": 28,
            "department": "HR",
            "job_role": "HR Manager",
            "salary": 65000.00,
            "plant": "Delhi"
        }
        self.employee = Employee.objects.create(**self.employee_data)

    def test_get_all_employees(self):
        """GET all employees"""
        response = self.client.get("/api/employees/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_create_employee(self):
        """POST create employee"""
        new_employee = {
            "name": "Bob Johnson",
            "age": 35,
            "department": "Finance",
            "job_role": "Accountant",
            "salary": 70000.00,
            "plant": "Bangalore"
        }

        response = self.client.post(
            "/api/employees/",
            new_employee,
            format="json"
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Employee.objects.count(), 2)

    def test_get_single_employee(self):
        """GET single employee"""
        response = self.client.get(f"/api/employees/{self.employee.id}/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["name"], "Jane Smith")

    def test_update_employee(self):
        """PUT update employee"""
        updated_data = self.employee_data.copy()
        updated_data["salary"] = 70000.00

        response = self.client.put(
            f"/api/employees/{self.employee.id}/",
            updated_data,
            format="json"
        )

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.employee.refr
