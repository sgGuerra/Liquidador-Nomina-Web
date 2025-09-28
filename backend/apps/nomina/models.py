from django.db import models
from apps.empleados.models import Empleado

class TipoHoraExtra(models.Model):
    tipo_hora_id = models.CharField(max_length=20, primary_key=True, db_column='tipo_hora_id')
    nombre_tipo_hora = models.CharField(max_length=50, db_column='nombre_tipo_hora')

    def __str__(self):
        return self.nombre_tipo_hora

    class Meta:
        db_table = 'tipos_horas_extra'

class HoraExtra(models.Model):
    id = models.AutoField(primary_key=True, db_column='id_hora_extra')
    empleado = models.ForeignKey(Empleado, on_delete=models.CASCADE, db_column='id_empleado')
    tipo_hora = models.ForeignKey(TipoHoraExtra, on_delete=models.CASCADE, db_column='id_tipo_hora')
    numero_de_horas = models.IntegerField(db_column='numero_de_horas')
    fecha_registro = models.DateField(auto_now_add=True, db_column='fecha_registro')

    def __str__(self):
        return f"{self.numero_de_horas} horas {self.tipo_hora} para {self.empleado}"

    class Meta:
        db_table = 'horas_extras'

class HistorialNomina(models.Model):
    id = models.AutoField(primary_key=True, db_column='id')
    cedula = models.CharField(max_length=11, db_column='cedula')
    fecha_calculo = models.DateTimeField(auto_now_add=True, db_column='fecha_calculo')
    salario_bruto = models.FloatField(db_column='salario_bruto')
    deducciones = models.FloatField(db_column='deducciones')
    impuestos = models.FloatField(db_column='impuestos')
    auxilio_transporte = models.FloatField(db_column='auxilio_transporte')
    neto = models.FloatField(db_column='neto')

    def __str__(self):
        return f"Historial para cédula {self.cedula} - {self.fecha_calculo}"

    class Meta:
        db_table = 'historial_nomina'
