from django.urls import path
from .views import register

urlpatterns = [
    path('accountsUser/register/', register, name='register'),
]