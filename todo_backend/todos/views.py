from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from .models import Task, Category
from .serializers import TaskSerializer, CategorySerializer
from .permissions import IsAuthorOrReadOnly


class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class CategoryRetrieveUpdateDelentView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class TaskListCreateView(generics.ListCreateAPIView):
    # permission_classes = (IsAuthorOrReadOnly,)
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class TaskRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    # permission_classes = (IsAuthorOrReadOnly,)
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
