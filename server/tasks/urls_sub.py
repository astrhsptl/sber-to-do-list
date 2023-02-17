from django.urls import path

from .views import (
    SubTaskAPIView, SubTaskDetailAPIView,
)

urlpatterns = [
    path('', SubTaskAPIView.as_view(), name='sub_task_list'),
    path('<uuid:pk>/', SubTaskDetailAPIView.as_view(), name='sub_task_detail'),
]
