from django.contrib.auth import get_user_model
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

User = get_user_model()

@csrf_exempt  # Use this for testing only; implement CSRF protection in production
def register(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        name = data.get('name')  # Using 'name' instead of 'username'
        password = data.get('password')
        email = data.get('email')
        experience = data.get('experience', 0)  # Default to 0 if not provided
        age = data.get('age')  # Add age if needed

        if not name or not password or not email:
            return JsonResponse({'message': 'Missing required fields.'}, status=400)

        # Create and save the user
        user = User(username=name, email=email, experience=experience)
        user.set_password(password)  # Hash the password
        if age:  # If you want to store age
            user.age = age  # Assuming your CustomUser model has an 'age' field
        user.save()

        return JsonResponse({'message': 'User registered successfully.'}, status=201)

    return JsonResponse({'message': 'Invalid method.'}, status=405)
