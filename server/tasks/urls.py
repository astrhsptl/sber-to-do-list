from django.urls import path, include


urlpatterns = [
    path('status/', include('tasks.utls_status')),
    path('sub/', include('tasks.urls_sub')),
    path('main/', include('tasks.urls_main')),
]
