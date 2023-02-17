from django.urls import path

from .views import ProjectAPIView, ProjectDetailAPIView

urlpatterns = [
    path('', ProjectAPIView.as_view(), name='project_list'),
    path('<uuid:pk>/', ProjectDetailAPIView.as_view(), name='project_detail')
]
