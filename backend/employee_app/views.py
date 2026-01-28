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
            data = []
            for emp in employees:
                data.append({
                    "id": emp.id,
                    "name": emp.name,
                    "age": emp.age,
                    "department": emp.department,
                    "job_role": emp.job_role,
                    "salary": emp.salary,
                    "plant": emp.plant,
                })
            return JsonResponse(data, safe=False, status=200)

    elif request.method in ["PUT", "PATCH"]:
        if not employee_id:
            return JsonResponse({"error": "Employee ID is required in URL"}, status=400)
        
        try:
            data = json.loads(request.body)
            
            # Get the employee object
            try:
                employee = Employee.objects.get(id=employee_id)
            except Employee.DoesNotExist:
                return JsonResponse({"error": "Employee not found"}, status=404)
            
            # Update fields
            employee.name = data.get('name', employee.name)
            employee.age = data.get('age', employee.age)
            employee.department = data.get('department', employee.department)
            employee.job_role = data.get('job_role', employee.job_role)
            employee.salary = data.get('salary', employee.salary)
            employee.plant = data.get('plant', employee.plant)
            
            employee.save()
            
            return JsonResponse({
                "message": "Employee updated successfully",
                "employee": {
                    "id": employee.id,
                    "name": employee.name,
                    "age": employee.age,
                    "department": employee.department,
                    "job_role": employee.job_role,
                    "salary": employee.salary,
                    "plant": employee.plant,
                }
            }, status=200)
            
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    elif request.method == 'DELETE':
        if not employee_id:
            return JsonResponse({"error": "Employee ID is required in URL"}, status=400)
        
        try:
            employee = Employee.objects.get(id=employee_id)
            employee.delete()
            return JsonResponse({"message": "Employee deleted successfully"}, status=204)
        except Employee.DoesNotExist:
            return JsonResponse({"error": "Employee not found"}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    
    else:
        return JsonResponse({"error": "Method not allowed"}, status=405)