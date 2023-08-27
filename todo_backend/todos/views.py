from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from .models import Task
from .serializers import TaskSerializer
from .permissions import IsAuthorOrReadOnly


class TaskListCreateView(generics.ListCreateAPIView):
    permission_classes = (IsAuthorOrReadOnly,)
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class TaskRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthorOrReadOnly,)
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
