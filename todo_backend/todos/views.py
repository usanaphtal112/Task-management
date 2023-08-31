from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from .models import Task, Category
from .serializers import TaskSerializer, CategorySerializer
from drf_spectacular.utils import extend_schema


@extend_schema(
    description="Task Stage Board implementations",
    tags=["Tasks Stage"],
)
class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


@extend_schema(
    description="Task Stage Board implementations",
    tags=["Tasks Stage"],
)
class CategoryRetrieveUpdateDelentView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


@extend_schema(
    description="Task Board implementations",
    tags=["Tasks"],
)
class TaskListCreateView(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


@extend_schema(
    description="Task Board implementations",
    tags=["Tasks"],
)
class TaskRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
