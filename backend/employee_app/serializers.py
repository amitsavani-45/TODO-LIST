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
        