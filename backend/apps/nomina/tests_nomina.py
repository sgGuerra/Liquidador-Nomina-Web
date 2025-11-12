import pytest
from datetime import date
from apps.nomina.models import TipoHoraExtra, HoraExtra, HistorialNomina
from apps.empleados.models import Empleado

@pytest.mark.django_db
def test_crear_tipo_hora_extra():
    tipo = TipoHoraExtra.objects.create(
        tipo_hora_id="HED",
        nombre_tipo_hora="Hora Extra Diurna"
    )
    assert tipo.tipo_hora_id == "HED"
    assert str(tipo) == "Hora Extra Diurna"

@pytest.mark.django_db
def test_crear_empleado_y_hora_extra():
    empleado = Empleado.objects.create(
        cedula="123456789",
        nombre="Santiago",
        apellido="Cano",
        salario=2000000
    )
    tipo_hora = TipoHoraExtra.objects.create(
        tipo_hora_id="HEN",
        nombre_tipo_hora="Hora Extra Nocturna"
    )

    hora_extra = HoraExtra.objects.create(
        empleado=empleado,
        tipo_hora=tipo_hora,
        numero_de_horas=5
    )

    assert hora_extra.numero_de_horas == 5
    assert hora_extra.empleado.nombre == "Santiago"
    assert "Hora Extra Nocturna" in str(hora_extra)

@pytest.mark.django_db
def test_crear_historial_nomina():
    historial = HistorialNomina.objects.create(
        cedula="123456789",
        salario_bruto=2500000,
        deducciones=300000,
        impuestos=150000,
        auxilio_transporte=140606,
        neto=2500000 - 300000 - 150000 + 140606
    )

    assert historial.neto == 2190606
    assert isinstance(historial.fecha_calculo, date) is False  # Es un DateTimeField
    assert "123456789" in str(historial)

