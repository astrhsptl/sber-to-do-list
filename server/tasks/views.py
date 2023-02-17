from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from services.queries import get_queryset_in_tasks
from .models import TaskStatus, MainTask, SubTask
from .serilizers import (
    TaskStatusSerilizer, 
    MainTaskSerilizer, GetOnlyMainTaskSerilizer, 
    SubTaskSerilizer, GetOnlySubTaskSerilizer,)


class TaskStatusAPIView(ListCreateAPIView):
    queryset = TaskStatus.objects.all()
    serializer_class = TaskStatusSerilizer

class TaskStatusDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = TaskStatus.objects.all()
    serializer_class = TaskStatusSerilizer


class MainTaskAPIView(ListCreateAPIView):
    queryset = MainTask.objects.prefetch_related()
    serializer_class = MainTaskSerilizer

    def get_queryset(self, *args):
        return get_queryset_in_tasks(self.request, self.queryset, MainTask)

    def get(self, request, *args, **kwargs):
        return Response(GetOnlyMainTaskSerilizer(self.get_queryset(), many=True).data)

class MainTaskDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = MainTask.objects.all()
    serializer_class = MainTaskSerilizer
    
    def get(self, request, *args, **kwargs):
        return Response(GetOnlyMainTaskSerilizer(self.get_queryset(), many=True).data)
            
            
class SubTaskAPIView(ListCreateAPIView):
    queryset = SubTask.objects.all()
    serializer_class = SubTaskSerilizer

    def get_queryset(self, *args):
        return get_queryset_in_tasks(self.request, self.queryset, SubTask)
    
    def get(self, request, *args, **kwargs):
        return Response(GetOnlySubTaskSerilizer(self.get_queryset(), many=True).data)
            
class SubTaskDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = SubTask.objects.all()
    serializer_class = SubTaskSerilizer

    def get(self, request, *args, **kwargs):
        return Response(GetOnlySubTaskSerilizer(self.get_queryset(), many=True).data)
            
