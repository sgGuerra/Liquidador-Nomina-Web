from django.db import models
from apps.empleados.models import Empleado

class Prestamo(models.Model):
    id = models.AutoField(primary_key=True, db_column='id_prestamo')
    ESTADOS = [
        ('ACTIVO', 'Activo'),
        ('COMPLETADO', 'Completado'),
        ('VENCIDO', 'Vencido'),
    ]

    empleado = models.ForeignKey(Empleado, on_delete=models.CASCADE, db_column='id_empleado')
    monto = models.FloatField()
    numero_de_cuotas = models.IntegerField()
    tasa_interes = models.FloatField()
    fecha_inicio = models.DateField(auto_now_add=True)
    cuota_mensual = models.FloatField(null=True, blank=True)
    saldo_restante = models.FloatField(null=True, blank=True)
    estado = models.CharField(max_length=20, choices=ESTADOS, default='ACTIVO')

    def save(self, *args, **kwargs):
        if not self.cuota_mensual:
            # Calculate cuota_mensual using LoanService logic
            from services.loan_service import LoanService
            self.cuota_mensual = LoanService.calcular_cuota_mensual(
                self.monto, self.tasa_interes, self.numero_de_cuotas
            )
        if self.saldo_restante is None:
            self.saldo_restante = self.monto
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Préstamo de {self.empleado} - {self.monto}"

    class Meta:
        db_table = 'prestamos'
