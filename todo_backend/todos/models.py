from django.db import models

# Create your models here.
from django.conf import settings
from django.utils import timezone


class Category(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name


class Task(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField()
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
