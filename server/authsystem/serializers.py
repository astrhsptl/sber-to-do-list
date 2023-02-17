from rest_framework import serializers

from .models import User


class LoginSerializer(serializers.ModelSerializer):
    '''Login serializer. Including name, surname, email, password, is_superuser, is_staff'''
    password = serializers.CharField(
        max_length=256
    )

    class Meta:
        model = User
        fields = (
            'email', 'password',
            'is_superuser', 'is_staff',
        )

class RegisterSerializer(serializers.ModelSerializer):
    '''Register serializer. Including name, surname, email, password, is_superuser, is_staff'''
    password = serializers.CharField(
        max_length=256
    )
    
    class Meta:
        model = User
        fields = (
            'email', 'password', 
            'is_superuser', 'is_staff',
        )
    
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class UserPatchingSerializer(serializers.ModelSerializer):
    '''Serializer for user patching. Including name, surname, email, password, is_superuser, is_staff'''
    class Meta:
        model = User
        fields = (
            'email', 'password', 
            'is_superuser', 'is_staff',
        )