from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    age = models.IntegerField(default=18)  # Add a default value
    experience = models.IntegerField(default=0)

    def __str__(self):
        return self.username