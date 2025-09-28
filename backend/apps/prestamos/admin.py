from django.contrib import admin
from .models import Prestamo

@admin.register(Prestamo)
class PrestamoAdmin(admin.ModelAdmin):
    list_display = ('id', 'empleado', 'monto', 'numero_de_cuotas', 'tasa_interes', 'saldo_restante', 'estado')
    search_fields = ('empleado__cedula', 'empleado__nombres')
    list_filter = ('estado', 'fecha_inicio')
