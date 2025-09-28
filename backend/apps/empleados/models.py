from django.db import models
from django.core.exceptions import ValidationError
from django.core.validators import MinLengthValidator, MaxLengthValidator, RegexValidator
from apps.cargos.models import Cargo

def validate_cedula(value):
    if not value.isdigit():
        raise ValidationError('La cédula debe contener solo números.')
    if len(value) < 8:
        raise ValidationError('La cédula debe tener al menos 8 dígitos.')
    if len(value) > 10:
        raise ValidationError('La cédula debe tener máximo 10 dígitos.')

def validate_names(value):
    if not all(c.isalpha() or c.isspace() for c in value):
        raise ValidationError('El nombre debe contener solo letras y espacios.')

def validate_salario_base(value):
    if value <= 0:
        raise ValidationError('El salario base debe ser mayor a cero.')
    if value < 1423500:  # SALARIO_MINIMO_LEGAL_VIGENTE
        raise ValidationError('El salario base no puede ser menor al mínimo legal.')

class Empleado(models.Model):
    cedula = models.CharField(
        max_length=11,
        primary_key=True,
        validators=[validate_cedula]
    )
    nombres = models.CharField(
        max_length=25,
        validators=[validate_names]
    )
    apellidos = models.CharField(
        max_length=30,
        validators=[validate_names]
    )
    correo = models.EmailField(blank=True, null=True)
    telefono = models.CharField(max_length=15, blank=True, null=True)
    salario_base = models.FloatField(validators=[validate_salario_base])
    cargo = models.ForeignKey(Cargo, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.nombres} {self.apellidos} ({self.cedula})"

    class Meta:
        db_table = 'empleados'
