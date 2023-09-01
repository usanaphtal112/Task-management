from django.test import TestCase

# Create your tests here.

from django.test import TestCase
from .models import Category, Task


class CategoryModelTest(TestCase):
    def setUp(self):
        self.category = Category.objects.create(name="Test Category")

    def test_category_str_representation(self):
        self.assertEqual(str(self.category), "Test Category")


class TaskModelTest(TestCase):
    def setUp(self):
        # Create a sample category
        self.category = Category.objects.create(name="Test Category")

        # Create a sample task associated with the category
        self.task = Task.objects.create(
            category=self.category, title="Test Task", description="This is a test task"
        )

    def test_task_str_representation(self):
        self.assertEqual(str(self.task), "Test Task")

    def test_task_category_relationship(self):
        # Test if the task is associated with the correct category
        self.assertEqual(self.task.category, self.category)
