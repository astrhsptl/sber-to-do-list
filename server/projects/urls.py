from django.urls import path

from .views import ProjectAPIView, ProjectDetailAPIView, ProjectsForUserAPIView
urlpatterns = [
    path('', ProjectAPIView.as_view(), name='project_list'),
    path('<uuid:pk>/', ProjectDetailAPIView.as_view(), name='project_detail'),
    path('by/user/<uuid:pk>/', ProjectsForUserAPIView.as_view(), name='projects_list_by_user'),
]
