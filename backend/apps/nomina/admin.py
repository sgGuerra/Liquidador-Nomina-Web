from django.contrib import admin
from .models import TipoHoraExtra, HoraExtra, HistorialNomina

@admin.register(TipoHoraExtra)
class TipoHoraExtraAdmin(admin.ModelAdmin):
    list_display = ('tipo_hora_id', 'nombre_tipo_hora')
    search_fields = ('nombre_tipo_hora',)

@admin.register(HoraExtra)
class HoraExtraAdmin(admin.ModelAdmin):
    list_display = ('id', 'empleado', 'tipo_hora', 'numero_de_horas', 'fecha_registro')
    search_fields = ('empleado__cedula', 'empleado__nombres')
    list_filter = ('tipo_hora', 'fecha_registro')

@admin.register(HistorialNomina)
class HistorialNominaAdmin(admin.ModelAdmin):
    list_display = ('id', 'cedula', 'fecha_calculo', 'salario_bruto', 'neto')
    search_fields = ('cedula',)
    list_filter = ('fecha_calculo',)
