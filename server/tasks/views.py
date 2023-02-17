from django.db.models import Q
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

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
        try:
            parametr = self.request.query_params['is_ended']
            return self.queryset.filter(Q(status_id=(int(parametr)+1))) if parametr == '0' or parametr == '1' else MainTask.objects.prefetch_related()
        except:
            return MainTask.objects.prefetch_related()


class MainTaskDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = MainTask.objects.all()
    serializer_class = MainTaskSerilizer


class SubTaskAPIView(ListCreateAPIView):
    queryset = SubTask.objects.all()
    serializer_class = SubTaskSerilizer

    def get_queryset(self, *args):
        try:
            parametr = self.request.query_params['is_ended']
            return self.queryset.filter(Q(status_id=(int(parametr)+1))) if parametr == '0' or parametr == '1' else SubTask.objects.all()
        except:
            return SubTask.objects.all()
        
class SubTaskDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = SubTask.objects.all()
    serializer_class = SubTaskSerilizer