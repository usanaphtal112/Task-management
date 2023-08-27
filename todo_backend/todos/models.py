from django.db import models

# Create your models here.
from django.conf import settings
from django.utils import timezone


class Task(models.Model):
    STATUS_CHOICES = [
        ("To Do", "To Do"),
        ("Doing", "Doing"),
        ("Done", "Done"),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="To Do")
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
