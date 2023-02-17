from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from services.queries import get_queryset_in_tasks
from .models import TaskStatus, MainTask, SubTask
from .serilizers import TaskStatusSerilizer, MainTaskSerilizer, SubTaskSerilizer


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


class MainTaskDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = MainTask.objects.all()
    serializer_class = MainTaskSerilizer


class SubTaskAPIView(ListCreateAPIView):
    queryset = SubTask.objects.all()
    serializer_class = SubTaskSerilizer

    def get_queryset(self, *args):
        return get_queryset_in_tasks(self.request, self.queryset, SubTask)

        
class SubTaskDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = SubTask.objects.all()
    serializer_class = SubTaskSerilizer