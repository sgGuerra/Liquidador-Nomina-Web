from django.db import models

class Cargo(models.Model):
    nombre = models.CharField(max_length=255, unique=True, db_column='cargo_empleado')
    bonificacion = models.FloatField(default=0.0)

    def __str__(self):
        return self.nombre

    class Meta:
        db_table = 'cargos'
