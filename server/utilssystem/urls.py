from django.urls import path

from .views import StatistsByUserAPIView

urlpatterns = [
    path('statists/<uuid:pk>/', StatistsByUserAPIView.as_view(),),
]
