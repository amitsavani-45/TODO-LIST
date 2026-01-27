from django.urls import path
from .views import save_employee

urlpatterns = [
    path('save/', save_employee),
      path('list/', save_employee),
]
