from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

from services.authentication import authentication, register
from .serializers import (
    LoginSerializer, RegisterSerializer, 
    StartPasswordRestoreSerializer,
)

from .models import User
from server.settings import ALLOWED_HOSTS
from services.task import sending_mail
from .serializers import UserPatchingSerializer, PasswordRestoreSerializer, LoginRequestSerializer, LoginSerializer

class LoginAPIView(generics.GenericAPIView):
    '''This api relise sign in on jwt architecture. Return name, surname, email, is_superuser, is_staff and access token. Supports only post request'''
    serializer_class = LoginRequestSerializer
    
    def post(self, request) -> Response:
        response_description, response_status = authentication(request, LoginSerializer)
        return Response(response_description, status=response_status)

class RegisterAPIView(generics.GenericAPIView):
    '''This api relise sign up on jwt architecture. Return  name, surname, email, is_superuser, is_staff '''
    serializer_class = RegisterSerializer
    permission_classes = (AllowAny, )

    def post(self, request) -> Response:
        response_description, response_status = register(request, self.serializer_class)
        return Response(response_description, status=response_status)

class StartingPasswordRestoreAPIView(generics.GenericAPIView):
    serializer_class = StartPasswordRestoreSerializer

    def post(self, request, *args, **kwargs):
        try:
            email=request.POST['email']
            sending_mail.delay(email, 'Subject here', f'http://{ALLOWED_HOSTS[0]}/api/v1/docs/auth/password/restore/?email={email}',)
            return Response({'detail': 'message has been sended'},)
        except:
            return Response({'detail': 'error. check email'},)

class PasswordRestoreAPIView(generics.GenericAPIView):
    serializer_class = PasswordRestoreSerializer

    def post(self, request, *args, **kwargs):
        email = request.query_params['email']
        user = User.objects.get(email=email)
        user.set_password(request.POST['password'])
        user.save()
        return Response(UserPatchingSerializer(user).data,)

class UserInformationAndPatchingListView(generics.ListAPIView):
    ''' API for User db model. Support get, put, patch, delete. Queryset - concrete object '''
    queryset = User.objects.all()
    serializer_class = UserPatchingSerializer

class UserInformationAndPatchingRetrieveAPIView(generics.RetrieveUpdateDestroyAPIView):
    ''' API for User db model. Support get, put, patch, delete. Queryset - concrete object '''
    queryset = User.objects.all()
    serializer_class = UserPatchingSerializer