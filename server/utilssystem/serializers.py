from rest_framework.serializers import ModelSerializer, ReadOnlyField

from authsystem.models import User
from tasks.models import TaskStatus, MainTask, SubTask
from tasks.serilizers import (
    TaskStatusSerilizer, MainTaskSerilizer,
    SubTaskSerilizer,)


class UserStatisticSerializer(ModelSerializer):
    tasks = MainTaskSerilizer(read_only=True, many=True,)

    class Meta:
        model = User
        fields = ('__all__')