from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import TipoHoraExtra, HoraExtra, HistorialNomina
from .serializers import TipoHoraExtraSerializer, HoraExtraSerializer, HistorialNominaSerializer

class TipoHoraExtraViewSet(viewsets.ModelViewSet):
    queryset = TipoHoraExtra.objects.all()
    serializer_class = TipoHoraExtraSerializer
    permission_classes = [IsAuthenticated]

class HoraExtraViewSet(viewsets.ModelViewSet):
    queryset = HoraExtra.objects.all()
    serializer_class = HoraExtraSerializer
    permission_classes = [IsAuthenticated]

class HistorialNominaViewSet(viewsets.ModelViewSet):
    queryset = HistorialNomina.objects.all()
    serializer_class = HistorialNominaSerializer
    permission_classes = [IsAuthenticated]
