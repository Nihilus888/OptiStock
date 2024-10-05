from rest_framework import serializers
from .models import CustomUser  # or `from django.contrib.auth.models import User` if using the default

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser  # or `User` if using the default
        fields = ['username', 'email', 'password', 'first_name', 'last_name', 'experience']
        extra_kwargs = {'password': {'write_only': True}}  # Ensure the password is write-only

    def create(self, validated_data):
        user = CustomUser(**validated_data)
        user.set_password(validated_data['password'])  # Hash the password
        user.save()
        return user