from django.contrib import admin
from .models import Empleado

@admin.register(Empleado)
class EmpleadoAdmin(admin.ModelAdmin):
    list_display = ('cedula', 'nombres', 'apellidos', 'cargo', 'salario_base')
    search_fields = ('cedula', 'nombres', 'apellidos')
    list_filter = ('cargo',)
