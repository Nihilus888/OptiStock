from django.contrib.auth import get_user_model, authenticate
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer
from rest_framework import status
import json

User = get_user_model()

@csrf_exempt  # Only for development; remove in production or use proper CSRF handling
@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({'message': 'User registered successfully.'}, status=status.HTTP_201_CREATED)
        
        # Return validation errors if the data is invalid
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    return JsonResponse({'message': 'Invalid method.'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

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
@permission_classes([IsAuthenticated])  # Require authentication
def protected_view(request):
    return JsonResponse({'message': 'This is a protected view.'}, status=200)
