from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from rest_framework import status


from authsystem.models import User
from tasks.models import TaskStatus, MainTask, SubTask
from .serializers import UserStatisticSerializer
from tasks.serilizers import MainTaskSerilizer

class StatistsByUserAPIView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserStatisticSerializer

    def get_queryset(self):
        # print(self.queryset.filter(pk=self.kwargs['pk']).prefetch_related())
        asd = MainTask.objects.filter(participants=self.queryset.get(pk=self.kwargs['pk'])).prefetch_related()
        print(MainTaskSerilizer(asd[0]).data)
        return self.queryset.prefetch_related()