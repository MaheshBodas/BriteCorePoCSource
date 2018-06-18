#from riskapi.models import RiskType,Risk
#from riskapi.serializers import RiskTypeSerializer,RiskSerializer
from .models import *
from .serializers import *
from rest_framework import generics
from rest_framework import permissions
from django_filters import rest_framework as filters

class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('username', 'email', 'is_staff',)
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('username', 'email', 'is_staff',)
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)

class RiskTypeKeyList(generics.ListAPIView):
    queryset = RiskType.objects.all()
    serializer_class = RiskTypeKeySerializer
    permission_classes = (permissions.IsAuthenticated,)    
    # http_method_names = ['get']

class RiskKeyList(generics.ListAPIView):
    queryset = Risk.objects.all()
    serializer_class = RiskKeySerializer
    permission_classes = (permissions.IsAuthenticated,)    
    # http_method_names = ['get']

class RiskTypeList(generics.ListCreateAPIView):
    queryset = RiskType.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('id', 'risk_type_name',)
    serializer_class = RiskTypeSerializer
    permission_classes = (permissions.IsAdminUser,)
    # http_method_names = ['get', 'post']

    def perform_create(self, serializer):
        serializer.save(createdby=self.request.user)

class RiskTypeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = RiskType.objects.all()
    # risktype = RiskType.objects.get(pk=pk)
    serializer_class = RiskTypeSerializer
    permission_classes = (permissions.IsAdminUser,)

class RiskList(generics.ListCreateAPIView):
    queryset = Risk.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filter_fields = ('id', 'risk_name',)
    serializer_class = RiskSerializer    
    permission_classes = (permissions.IsAuthenticated,)
    # http_method_names = ['get', 'post']

    def perform_create(self, serializer):
        serializer.save(createdby=self.request.user)

class RiskDetail(generics.RetrieveUpdateDestroyAPIView):
    # risk = Risk.objects.get(pk=pk)
    queryset = Risk.objects.all()
    serializer_class = RiskSerializer
    permission_classes = (permissions.IsAuthenticated,)
