import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Employee

@csrf_exempt
def save_employee(request):
    if request.method == "POST":
        data = json.loads(request.body)

        Employee.objects.create(
            name=data['name'],
            age=data['age'],
            department=data['department'],
            job_role=data['jobRole'],
            salary=data['salary'],
            plant=data['plant']
        )

        return JsonResponse({"message": "Employee saved successfully"})
        

    elif request.method == "GET":
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

    return JsonResponse({"error": "Method not allowed"}, status=405)