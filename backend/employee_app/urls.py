from django.urls import path
from .views import save_employee

urlpatterns = [
    path('save/', save_employee, name='employee-list'),
    path('save/<int:employee_id>/', save_employee, name='employee-detail'),
]