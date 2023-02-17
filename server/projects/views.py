from django.http import Http404
from rest_framework.response import Response
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

from .models import Project
from .serializers import ProjectSerilizer, GetOnlyProjectSerilizer
from services.http_requests import (
    _destroy, _post, 
    _put, _update,
)

class ProjectAPIView(ListCreateAPIView):
    queryset = Project.objects.prefetch_related()
    serializer_class = ProjectSerilizer
    _my_detail_serializer = GetOnlyProjectSerilizer
    _my_model = Project

    def get(self, request, *args, **kwargs):
        return Response(self._my_detail_serializer(self.get_queryset(), many=True).data)

    def post(self, request, *args, **kwargs):
        return _post(request, self.get_serializer, self.perform_create, self._my_model, self._my_detail_serializer)

class ProjectDetailAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerilizer
    _my_detail_serializer = GetOnlyProjectSerilizer
    _my_model = Project

    def get_queryset(self):
        req = self._my_model.objects.filter(id=self.kwargs['pk'])
        if len(req) == 0:
            raise Http404
        else:
            return req

    def get(self, request, *args, **kwargs):
        return Response(self._my_detail_serializer(self.get_queryset(), many=True).data)

    def put(self, request, *args, **kwargs):
        return _put(request, self.get_serializer, self.get_object, self.perform_update, self._my_model, self._my_detail_serializer,)
    
    def patch(self, request, *args, **kwargs):
        return _update(request, self.get_object, self.get_serializer, self.perform_update, self._my_model, self._my_detail_serializer, *args, **kwargs) 
    
    def delete(self, request, *args, **kwargs):
        return _destroy(request, self.get_object, self.perform_destroy, *args, **kwargs)