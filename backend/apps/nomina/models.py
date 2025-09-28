from django.db import models
from apps.empleados.models import Empleado

class TipoHoraExtra(models.Model):
    tipo_hora_id = models.CharField(max_length=20, primary_key=True)
    nombre_tipo_hora = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre_tipo_hora

    class Meta:
        db_table = 'tipos_horas_extra'

class HoraExtra(models.Model):
    empleado = models.ForeignKey(Empleado, on_delete=models.CASCADE)
    tipo_hora = models.ForeignKey(TipoHoraExtra, on_delete=models.CASCADE)
    numero_de_horas = models.IntegerField()
    fecha_registro = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.numero_de_horas} horas {self.tipo_hora} para {self.empleado}"

    class Meta:
        db_table = 'horas_extras'

class HistorialNomina(models.Model):
    empleado = models.ForeignKey(Empleado, on_delete=models.CASCADE)
    fecha_calculo = models.DateTimeField(auto_now_add=True)
    salario_bruto = models.FloatField()
    deducciones = models.FloatField()
    impuestos = models.FloatField()
    auxilio_transporte = models.FloatField()
    neto = models.FloatField()

    def __str__(self):
        return f"Historial de {self.empleado} - {self.fecha_calculo}"

    class Meta:
        db_table = 'historial_nomina'
