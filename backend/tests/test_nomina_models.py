import pytest
from apps.nomina.models import TipoHoraExtra, HoraExtra, HistorialNomina
from apps.empleados.models import Empleado
from django.utils import timezone


@pytest.mark.django_db
def test_crear_tipo_hora_extra():
    tipo = TipoHoraExtra.objects.create(
        tipo_hora_id="HEXTRA1",
        nombre_tipo_hora="Hora Extra Diurna"
    )
    assert tipo.nombre_tipo_hora == "Hora Extra Diurna"


@pytest.mark.django_db
def test_crear_hora_extra():
    empleado = Empleado.objects.create(
        cedula="123456789",
        nombre="Juan Pérez",
        cargo_id="DEV01",
        salario_base=2000000
    )
    tipo = TipoHoraExtra.objects.create(
        tipo_hora_id="HEXTRA1",
        nombre_tipo_hora="Hora Extra Diurna"
    )
    hora = HoraExtra.objects.create(
        empleado=empleado,
        tipo_hora=tipo,
        numero_de_horas=5
    )
    assert hora.numero_de_horas == 5
    assert hora.tipo_hora == tipo
    assert hora.empleado == empleado


@pytest.mark.django_db
def test_historial_nomina_registro():
    registro = HistorialNomina.objects.create(
        cedula="123456789",
        salario_bruto=2000000,
        deducciones=100000,
        impuestos=50000,
        auxilio_transporte=162000,
        neto=2012000
    )
    assert registro.neto == 2012000
    assert isinstance(registro.fecha_calculo, timezone.datetime)

