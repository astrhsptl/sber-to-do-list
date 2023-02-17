from django.urls import path

from .views import (
    TaskStatusAPIView, TaskStatusDetailAPIView,
)

urlpatterns = [
    path('', TaskStatusAPIView.as_view(), name='status_list'),
    path('<uuid:pk>/', TaskStatusDetailAPIView.as_view(), name='status_detail'),
]
