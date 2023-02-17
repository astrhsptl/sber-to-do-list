from django.urls import path

from .views import (
    MainTaskAPIView, MainTaskDetailAPIView,
)

urlpatterns = [
    path('', MainTaskAPIView.as_view(), name='task_list'),
    path('<uuid:pk>/', MainTaskDetailAPIView.as_view(), name='task_detail'),
]
