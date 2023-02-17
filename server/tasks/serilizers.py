from rest_framework import serializers


from .models import MainTask, SubTask, TaskStatus

class TaskStatusSerilizer(serializers.ModelSerializer):
    class Meta:
        model = TaskStatus
        fields = '__all__'

class SubTaskSerilizer(serializers.ModelSerializer):
    class Meta:
        model = SubTask
        fields = '__all__'

    def validate(self, data):
        return data

class MainTaskSerilizer(serializers.ModelSerializer):
    sub_task = SubTaskSerilizer(read_only=True, many=True)

    class Meta:
        model = MainTask
        fields = '__all__'

    def validate(self, data):
        return data
