from django.db import models

# Create your models here.


class Task(models.Model):
    STATUS_CHOICES = [
        ("To Do", "To Do"),
        ("Doing", "Doing"),
        ("Done", "Done"),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="To Do")

    def __str__(self):
        return self.title
