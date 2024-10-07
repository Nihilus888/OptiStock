from django.contrib.auth import get_user_model, authenticate, login as auth_login  # Import authenticate
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
import json

User = get_user_model()

@csrf_exempt  # Use this for testing only; implement CSRF protection in production
def register(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')

        if not username or not password or not email:
            return JsonResponse({'message': 'Missing required fields.'}, status=400)

        user = User(username=username, email=email)
        user.set_password(password)
        user.save()

        return JsonResponse({'message': 'User registered successfully.'}, status=201)

    return JsonResponse({'message': 'Invalid method.'}, status=405)

@csrf_exempt  # Use this for testing only; implement CSRF protection in production
def login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return JsonResponse({'message': 'Missing required fields.'}, status=400)

        # Authenticate the user
        user = authenticate(request, username=username, password=password)  # Make sure authenticate is imported
        if user is not None:
            refresh = RefreshToken.for_user(user)
            access = str(refresh.access_token)

            return JsonResponse({
                'message': 'User logged in successfully.',
                'access': access,
                'refresh': str(refresh),
            }, status=200)
        else:
            return JsonResponse({'message': 'Invalid credentials.'}, status=401)

    return JsonResponse({'message': 'Invalid method.'}, status=405)

@api_view(['GET'])
def protected_view(request):
    return JsonResponse({'message': 'This is a protected view.'}, status=200)
