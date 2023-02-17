from django.urls import path 
from rest_framework_simplejwt.views import (
    TokenObtainPairView, TokenRefreshView, TokenVerifyView)

from .views import (
    LoginAPIView, RegisterAPIView,UserInformationAndPatchingRetrieveAPIView
)

urlpatterns = [
    path('login/', LoginAPIView.as_view(), name='login'),
    path('register/', RegisterAPIView.as_view(), name='register'),
    path('profile/changes/', UserInformationAndPatchingRetrieveAPIView.as_view(), name='user_progile_changing'),

    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]
