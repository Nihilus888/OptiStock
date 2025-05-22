from django.urls import path
from .views import balance_sheet

urlpatterns = [
    path('balance-sheet/<str:symbol>/', balance_sheet),
]