import pytest
from apps.nomina.models import TipoHoraExtra, HoraExtra, HistorialNomina
from apps.empleados.models import Empleado


@pytest.mark.django_db
def test_integra_empleado_horas_y_historial():
    empleado = Empleado.objects.create(
        cedula="987654321",
        nombre="María Gómez",
        cargo_id="ENG01",
        salario_base=2500000
    )

    tipo_hora = TipoHoraExtra.objects.create(
        tipo_hora_id="HEXTRA2",
        nombre_tipo_hora="Hora Extra Nocturna"
    )

    HoraExtra.objects.create(
        empleado=empleado,
        tipo_hora=tipo_hora,
        numero_de_horas=3
    )

    historial = HistorialNomina.objects.create(
        cedula=empleado.cedula,
        salario_bruto=empleado.salario_base,
        deducciones=120000,
        impuestos=60000,
        auxilio_transporte=162000,
        neto=2480000
    )

    assert historial.cedula == empleado.cedula
    assert historial.neto == 2480000
    assert HoraExtra.objects.count() == 1
