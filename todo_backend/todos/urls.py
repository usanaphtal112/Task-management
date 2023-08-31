from django.urls import path
from .views import (
    TaskListCreateView,
    TaskRetrieveUpdateDeleteView,
    CategoryRetrieveUpdateDelentView,
    CategoryListCreateView,
)

urlpatterns = [
    path("tasks/", TaskListCreateView.as_view(), name="task-list-create"),
    path(
        "tasks/<int:pk>/",
        TaskRetrieveUpdateDeleteView.as_view(),
        name="task-retrieve-update-delete",
    ),
    path(
        "taskboard_stage/",
        CategoryListCreateView.as_view(),
        name="task-stage-list-create",
    ),
    path(
        "taskboard_stage/<int:pk>/",
        CategoryRetrieveUpdateDelentView.as_view(),
        name="task-stage-retrieve-update-delete",
    ),
]
