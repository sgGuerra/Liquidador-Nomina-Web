from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
from .models import Empleado
from .serializers import EmpleadoSerializer
from apps.nomina.models import HistorialNomina
from services.nomina_service import NominaService

class EmpleadoViewSet(viewsets.ModelViewSet):
    queryset = Empleado.objects.all()
    serializer_class = EmpleadoSerializer
    permission_classes = [AllowAny]
    lookup_field = 'cedula'

    def update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return super().update(request, *args, **kwargs)

    @action(detail=True, methods=['post'])
    def calculate_nomina(self, request, cedula=None):
        empleado = get_object_or_404(Empleado, cedula=cedula)
        try:
            resultado = NominaService.calcular_nomina(empleado)

            # Save to history
            HistorialNomina.objects.create(
                empleado=empleado,
                salario_bruto=resultado['salario_bruto'],
                deducciones=resultado['deducciones_legales'] + resultado['deducciones_prestamos'],
                impuestos=resultado['impuestos'],
                auxilio_transporte=resultado['auxilio_transporte'],
                neto=resultado['neto']
            )

            return Response(resultado, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
