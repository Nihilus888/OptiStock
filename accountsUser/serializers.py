from rest_framework import serializers
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser  # Reference to your custom user model
        fields = ['username', 'email', 'password', 'first_name', 'last_name', 'age', 'experience']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            age=validated_data.get('age', 0),
            experience=validated_data.get('experience', 0),
        )
        user.set_password(validated_data['password'])  # Hash the password
        user.save()
        return user