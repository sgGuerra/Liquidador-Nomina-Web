from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Prestamo
from .serializers import PrestamoSerializer
from services.loan_service import LoanService

class PrestamoViewSet(viewsets.ModelViewSet):
    queryset = Prestamo.objects.all()
    serializer_class = PrestamoSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=['get'])
    def amortizacion(self, request, pk=None):
        prestamo = self.get_object()
        tabla = LoanService.generar_tabla_amortizacion(
            prestamo.monto, prestamo.tasa_interes, prestamo.numero_de_cuotas
        )
        return Response(tabla)
