from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from .models import Cargo
from .serializers import CargoSerializer

class CargoViewSet(viewsets.ModelViewSet):
    queryset = Cargo.objects.all()
    serializer_class = CargoSerializer
    permission_classes = [AllowAny]
