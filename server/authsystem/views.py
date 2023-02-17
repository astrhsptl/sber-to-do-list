from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from services.authentication import authentication, register
from .serializers import LoginSerializer, RegisterSerializer

from .models import User
from .serializers import UserPatchingSerializer

class LoginAPIView(generics.GenericAPIView):
    '''This api relise sign in on jwt architecture. Return name, surname, email, is_superuser, is_staff and access token. Supports only post request'''
    serializer_class = LoginSerializer
    
    def post(self, request) -> Response:
        response_description, response_status = authentication(request, self.serializer_class)
        return Response(response_description, status=response_status)

class RegisterAPIView(generics.GenericAPIView):
    '''This api relise sign up on jwt architecture. Return  name, surname, email, is_superuser, is_staff '''
    serializer_class = RegisterSerializer
    permission_classes = (AllowAny, )

    def post(self, request) -> Response:
        response_description, response_status = register(request, self.serializer_class)
        return Response(response_description, status=response_status)

class UserInformationAndPatchingRetrieveAPIView(generics.RetrieveUpdateDestroyAPIView):
    ''' API for User db model. Support get, put, patch, delete. Queryset - concrete object '''
    queryset = User.objects.all()
    serializer_class = UserPatchingSerializer